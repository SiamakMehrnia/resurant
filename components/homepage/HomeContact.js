const HomeContact = () => {
  return (
    <section className="bg-white py-10 px-6 flex flex-col md:flex-row gap-6 max-w-7xl mx-auto text-black">
      {/* Address Section */}
      <div className="flex-1 text-left">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p>Hauptstraße 123</p>
        <p>12345 Berlin, Deutschland</p>
        <p>Phone: +49 123 456789</p>
        <p>Email: info@mojesto.de</p>
      </div>

      {/* Map Section */}
      <div className="flex-1 h-64">
        <iframe
          title="Mojesto Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.4961026741514!2d13.404954315803743!3d52.52000677981219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c23eec4ed7%3A0xe4be046e98be6a1d!2sHauptstra%C3%9Fe%20123%2C%2012345%20Berlin%2C%20Deutschland!5e0!3m2!1sen!2sde!4v1685113942967!5m2!1sen!2sde"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default HomeContact;