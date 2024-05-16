var mysql = require("./dbConnection");
var mongoClient = require("./mongodbConnection");
var mongoDb = mongoClient.getDb();

module.exports = {
    /**
     * Remove the sensitive field from the result.
     * @ param {*} result The result from the database.
     * @ param {*} key The field that is sensitive.
     * @ returns The result without the sensitive field.
     */
    removeKey: function (result, key) {
        for (let i = 0; i < result.length; i++) {
            delete result[i][key];
        }
        return result;
    },
    /**
     * This is the function that searches for any existing diagnosis and treatment.
     * @param {*} id Existed id from the table "patients_registration" under MySQL database.
     * @ returns If success, return {success: {diagnosis: {...}, healthRecord {...}, treatment: [...]}}; otherwise, return {error:"Error message."}.
     */
    getMedicalHistory: async function (id) {
        let sqlDB = mysql.connect();

        // Get disease tables
        sql = `SELECT tableName FROM active_record_disease_list WHERE tableType = "disease"`;
        try {
            result = await mysql.queryWithDB(sql, sqlDB);
        } catch (error) {
            console.log(error);
            sqlDB.end();
            return { error: "Something wrong in MySQL." };
        }

        let records = { diagnosis: {}, healthRecord: {}, treatment: [] };

        // Find disease records
        for (const e of result) {
            // Execute query
            sql = `SELECT * FROM ${e.tableName} WHERE patient_id = ${id}`;
            try {
                result = await mysql.queryWithDB(sql, sqlDB);
                result = this.removeKey(result, "patient_id");
            } catch (error) {
                console.log(error);
                sqlDB.end();
                return { error: "Something wrong in MySQL." };
            }

            if (result.length > 0) records.diagnosis[e.tableName] = result;
        }

        // Get health test tables
        sql = `SELECT tableName, isInMongo FROM active_record_disease_list WHERE tableType = "Health Test"`;
        try {
            result = await mysql.queryWithDB(sql, sqlDB);
        } catch (error) {
            console.log(error);
            sqlDB.end();
            return { error: "Something wrong in MySQL." };
        }

        // Find health records
        for (const e of result) {
            if (e.isInMongo == 0) {
                // Execute query
                sql = `SELECT * FROM ${e.tableName} WHERE patient_id = ${id}`;
                try {
                    result = await mysql.queryWithDB(sql, sqlDB);
                    result = this.removeKey(result, "patient_id");
                } catch (error) {
                    console.log(error);
                    sqlDB.end();
                    return { error: "Something wrong in MySQL." };
                }
            } else {
                const sort = { RecordDate: -1 };
                result = await mongoDb
                    .collection(e.tableName)
                    .find({ patient_id: id }, { projection: { patient_id: 0 } })
                    .sort(sort)
                    .toArray();
            }

            if (result.length > 0) records.healthRecord[e.tableName] = result;
        }

        // Find treatment records
        sql = `SELECT treatment, RecordDate, disease_type, disease_id, Fname AS DoctorFirstName, Mname AS DoctorMiddleName, Lname AS DoctorLastName, Specialization 
          FROM patients_treatment JOIN doctors_registration ON patients_treatment.doctor_id = doctors_registration.id
          WHERE patient_id = ${id}`;
        try {
            result = await mysql.queryWithDB(sql, sqlDB);
        } catch (error) {
            console.log(error);
            sqlDB.end();
            return { error: "Something wrong in MySQL." };
        }

        if (result.length > 0) records.treatment = records.treatment.concat(result);

        sqlDB.end();
        return { success: records };
    },
    /**
     * This is the function that updates a single file (image) to the patient record in MongoDB.
     * @ param {*} patient_id Existed id from the table "patients_registration" under MySQL database.
     * @ param {*} recordType The record type, e.g. "X-Ray", this also represents the collection name in the MongoDB (case sensitive).
     * @ param {*} recordDate The date when this record was generated, e.g. "2023-03-01 09:00:00".
     * @ param {*} file The record, can be an image or other file that can be used on ML prediction directly.
     * @ returns If success, return {success: "New image created.", id: "id of this record"}; otherwise, return {error:"Error message."}.
     */
    imageUpload: async function (patient_id, recordType, recordDate, file) {
        if (!patient_id || !recordType || !recordDate || !file) {
            return {
                error: "Missing patient id, record type, record date, or record file.",
            };
        }

        const record = {
            patient_id: patient_id,
            RecordDate: recordDate,
            file: file,
        };

        const result = await mongoDb.collection(recordType).insertOne(record);
        return { success: "New image created.", id: result.insertedId };
    },
    /**
     * This is the function that retrieves all records in a specific record type in MongoDB through patient id.
     * @ param {*} patient_id Existed id from the table "patients_registration" under MySQL database.
     * @ param {*} recordType The record type, e.g. "X-Ray", this also represents the collection name in the MongoDB (case sensitive).
     * @ returns If success, return {success: [{Record A in JSON}, {Record B in JSON}, ...]}; otherwise, return return {error:"Error message."}.
     */
    imageRetrieveByPatientId: async function (patient_id, recordType) {
        if (!patient_id || !recordType) {
            return { error: "Missing patient id or record type." };
        }

        const sort = { RecordDate: -1 };
        const result = await mongoDb
            .collection(recordType)
            .find({ patient_id: patient_id }, { projection: { patient_id: 0 } })
            .sort(sort)
            .toArray();
        return { success: result };
    },
    /**
     * This is the function that retrieves specific records in a specific record type in MongoDB through the id of the record.
     * @ param {*} _id The id of the record in MongoDB.
     * @ param {*} recordType The record type, e.g. "X-Ray", this also represents the collection name in the MongoDB (case sensitive).
     * @ returns If success, return {success: {Record in JSON}}; otherwise, return return {error:"Error message."}.
     */
    imageRetrieveByRecordId: async function (_id, recordType) {
        if (!_id || !recordType) {
            return { error: "Missing patient id or record type." };
        }

        var mongo = require("mongodb");
        var o_id = new mongo.ObjectId(_id);
        const result = await mongoDb
            .collection(recordType)
            .findOne({ _id: o_id }, { projection: { patient_id: 0 } });
        return { success: result };
    }
}