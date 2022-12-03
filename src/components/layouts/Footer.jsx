const Footer = () => {

    const footerYear = new Date().getFullYear()

   return(

        <footer className="footer p-10 bg-neutral text-primary-content footer-center">
            <div>
                <p>copyright &copy; {footerYear}</p>
            </div>
        </footer>
   );


}
export default Footer;
