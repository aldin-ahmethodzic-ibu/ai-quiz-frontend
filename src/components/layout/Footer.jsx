import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Course Information</h3>
            <p className="mb-2">IT 309 - Software Engineering</p>
            <div className="mt-4">
              <p className="font-medium">Professor:</p>
              <p>Nermina Durmic</p>
            </div>
            <div className="mt-4">
              <p className="font-medium">Laboratory Assistants:</p>
              <p>Lejla Breščić & Ajla Korman</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Developed By</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Aldin Ahmethodžić</p>
                <a 
                  href="mailto:aldin.ahmethodzic@stu.ibu.edu.ba" 
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  aldin.ahmethodzic@stu.ibu.edu.ba
                </a>
              </div>
              
              <div>
                <p className="font-medium">Andrej Herman</p>
                <a 
                  href="mailto:andrej.herman@stu.ibu.edu.ba" 
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  andrej.herman@stu.ibu.edu.ba
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-indigo-500 text-center">
          <p>&copy; {new Date().getFullYear()} AI Quiz Generator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;