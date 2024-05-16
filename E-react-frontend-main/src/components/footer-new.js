import React, { useEffect, useState } from 'react';
import '../styles/components/Footer.css'
function Footer( props) {
  console.log(props, "From footer")
  const [IsLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setisAdmin] = useState(false)

  useEffect(() => {
    console.log("UseEffeoce")
    if(props.status=="NotLoggedIn"){
      setIsLoggedIn(false)
    }else{

      if(props.status=="Admin")
      {
        setisAdmin(true)
      }else{
        setisAdmin(false)
      }
      setIsLoggedIn(true)
    }
  }, [props.status])
  return (

   // <div class="footer-page">
    //<footer><p>&copy; {new Date().getFullYear()} Smart Digital Medicine</p></footer>
    //</div>

  <div>
  <footer class="footer-distributed ">

      <div class="footer-left">

        <h3><span>e</span>Hospital</h3>

        <p class="footer-links">
        <a href="terms" class="link-1">Terms and Conditions</a>
        {IsLoggedIn &&
        <a href="/testimonial">Testimonial</a>
}
{isAdmin &&
        <a href="/ViewRating">View Ratings</a>
}
        <a href="rights">Patient rights</a>
        </p>

        <p class="footer-company-name"><p>&copy; {new Date().getFullYear()} e-hospital React Platform</p></p>
      </div>

      <div class="footer-center">

        <div>
          <i class="fa fa-map-marker"></i>
          <p><span> 75 Laurier Ave E, </span> Ottawa, ON K1N 6N5</p>
        </div>

        <div>
          <i class="fa fa-phone"></i>
          <p>+1.555.555.5555</p>
        </div>

        <div>
          <i class="fa fa-envelope"></i>
          <p><a href="mailto:uottawabiomedicalsystems@gmail.com">uottawabiomedicalsystems@gmail.com</a></p>
        </div>

      </div>

      <div class="footer-right">

        <p class="footer-company-about">
          <span>About the company</span>
          Our e-Hospital platform offers convenient online consultations, medical records access, and appointment scheduling.
        </p>

        <div class="footer-icons">

          <a href="#"><i class="fa fa-facebook"></i></a>
          <a href="#"><i class="fa fa-twitter"></i></a>
          <a href="#"><i class="fa fa-linkedin"></i></a>
          <a href="#"><i class="fa fa-github"></i></a>

        </div>

      </div>

    </footer>
    </div>
  
    );
}

export default Footer;

 