import { motion } from 'framer-motion';
import { ChefHat, Leaf, Clock, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-secondary text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600')] bg-cover bg-center"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-4">Our Story</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Serving the best taste in Chowk Azam since day one.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=800" 
              alt="Our Kitchen" 
              className="rounded-[2rem] shadow-2xl"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">About Dubai Fast Food</h2>
            <h3 className="text-3xl md:text-5xl font-black text-secondary leading-tight">
              More Than Just <br/> A Restaurant
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              At Dubai Food & Pizza Hut, we believe that food is an experience. Located in the heart of Chowk Azam, our mission has always been to deliver premium, authentic, and unforgettable flavors to our community.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you're craving a juicy zinger burger, a loaded pizza, or an authentic desi karahi, our experienced chefs use only the freshest halal ingredients to craft your perfect meal.
            </p>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
          {[
            { icon: <Leaf />, title: 'Fresh Ingredients', desc: 'We source locally to ensure every bite is fresh.' },
            { icon: <ChefHat />, title: 'Experienced Chefs', desc: 'Masters of culinary arts crafting your meals.' },
            { icon: <Users />, title: 'Family Environment', desc: 'A perfect place to dine out with your loved ones.' },
            { icon: <Clock />, title: 'Fast Delivery', desc: 'Hot and fresh food delivered right to your door.' },
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
