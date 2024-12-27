import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">About DriveHive</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Welcome to <span className="font-bold text-gray-800">DriveHive</span>, your ultimate ride-sharing solution. At DriveHive, we aim to connect passengers with drivers seamlessly, ensuring safe, reliable, and cost-effective travel for everyone.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Founded with a vision to revolutionize urban mobility, DriveHive leverages cutting-edge technology to provide real-time ride availability, transparent pricing, and a user-friendly interface. Whether you're commuting to work, heading out with friends, or exploring a new city, DriveHive is here to make your journey smooth and enjoyable.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Our platform is built with a focus on sustainability, community, and innovation. By optimizing routes and encouraging ride-sharing, we aim to reduce traffic congestion and carbon footprints while creating meaningful connections between users.
        </p>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            To redefine transportation by offering a smart, efficient, and eco-friendly alternative to traditional travel methods.
          </p>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Have questions or feedback? We'd love to hear from you! Reach out to us at{' '}
            <a
              href="mailto:support@drivehive.com"
              className="text-blue-600 hover:underline"
            >
              support@drivehive.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
