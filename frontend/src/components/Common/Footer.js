import { Footer,Carousel  } from 'flowbite-react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import  '../../scss/footer.scss'
import React from 'react';

const FooterPage = () => {
    return (
        <Footer>
            <p></p>
            <p></p>
          <div className="w-full text-center">
            <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
              <Footer.Brand
                href="https://flowbite.com"
                src="https://flowbite.com/docs/images/logo.svg"
                alt="Flowbite Logo"
                name="Flowbite"
              />
              <Footer.LinkGroup>
                <a href="#">About</a>
                <p></p>
                <a href="#">Privacy Policy</a>
                <p></p>
                <a href="#">Licensing</a>
                <p></p>
                <a href="#">Contact</a>
              </Footer.LinkGroup>
            </div>
            <Footer.Divider />
          </div>
        </Footer>
      );
}

export default FooterPage
// Footer =() => {
//     return (
//         <Footer container>
//           <div className="w-full text-center">
//             <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
//               <Footer.Brand
//                 href="https://flowbite.com"
//                 src="https://flowbite.com/docs/images/logo.svg"
//                 alt="Flowbite Logo"
//                 name="Flowbite"
//               />
//               <Footer.LinkGroup>
//                 <Footer.Link href="#">About</Footer.Link>
//                 <Footer.Link href="#">Privacy Policy</Footer.Link>
//                 <Footer.Link href="#">Licensing</Footer.Link>
//                 <Footer.Link href="#">Contact</Footer.Link>
//               </Footer.LinkGroup>
//             </div>
//             <Footer.Divider />
//             <Footer.Copyright href="#" by="Flowbite™" year={2022} />
//           </div>
//         </Footer>
//       );
//     }
// export default Footer