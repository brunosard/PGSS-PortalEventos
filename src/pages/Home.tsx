import React from 'react';
import { Calendar, Users, MapPin, Clock, Star, ArrowRight, Play } from 'lucide-react';

const Home: React.FC = () => {
  // Dados mockados para eventos em destaque
  const featuredEvents = [
    {
      id: 1,
      title: "Congresso Internacional de Educação 2024",
      date: "15-17 Novembro 2024",
      location: "São Paulo, SP",
      type: "Congresso",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
      attendees: 1200,
      price: "Gratuito",
      featured: true
    },
    {
      id: 2,
      title: "Workshop de Metodologias Ativas",
      date: "22 Novembro 2024",
      location: "Rio de Janeiro, RJ",
      type: "Workshop",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
      attendees: 150,
      price: "R$ 150,00",
      featured: true
    },
    {
      id: 3,
      title: "Seminário de Inovação Educacional",
      date: "28-29 Novembro 2024",
      location: "Belo Horizonte, MG",
      type: "Seminário",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop",
      attendees: 300,
      price: "R$ 200,00",
      featured: true
    }
  ];

  return (
    <div className="min-h-screen bg-cogna-cinzaClaro dark:bg-cogna-cinzaEscuro">
      {/* Hero Section - Redesenhada */}
      <section className="relative overflow-hidden">
        {/* Background com gradiente e padrão */}
        <div className="absolute inset-0 bg-gradient-to-br from-cogna-cinzaClaro via-white to-cogna-cinzaClaro dark:from-cogna-cinzaEscuro dark:via-cogna-cinzaEscuro/80 dark:to-cogna-cinzaEscuro"></div>
        
        {/* Elementos decorativos */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-cogna-roxo rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-cogna-amarelo rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cogna-coral rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge de destaque */}
         

            {/* Título principal */}
            <h1 className="text-4xl lg:text-6xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-4 leading-tight">
              Portal de Eventos
              <span className="block text-cogna-roxo">Pós-graduação Stricto Sensu</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-lg lg:text-xl text-cogna-cinzaEscuro/80 dark:text-cogna-cinzaClaro/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubra, participe e organize eventos acadêmicos de excelência. 
              Conecte-se com a comunidade educacional e expanda seus conhecimentos.
            </p>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <button className="group bg-cogna-roxo text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-cogna-cinzaEscuro dark:hover:bg-cogna-cinzaClaro hover:text-cogna-cinzaClaro dark:hover:text-cogna-cinzaEscuro transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="flex items-center space-x-2">
                  <span>Explorar Eventos</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button className="group border-2 border-cogna-cinzaEscuro dark:border-cogna-cinzaClaro text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro px-8 py-4 rounded-xl font-semibold text-lg hover:bg-cogna-cinzaEscuro dark:hover:bg-cogna-cinzaClaro hover:text-cogna-cinzaClaro dark:hover:text-cogna-cinzaEscuro transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center space-x-2">
                  <Play size={20} className="group-hover:scale-110 transition-transform" />
                  <span>Como Funciona</span>
                </span>
              </button>
            </div>

      
          </div>
        </div>
      </section>

      {/* Seção de Eventos em Destaque */}
      <section className="py-20 bg-white dark:bg-cogna-cinzaEscuro/50">
        <div className="container mx-auto px-4">
          {/* Cabeçalho da seção */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-4">
              Eventos em Destaque
            </h2>
            <p className="text-xl text-cogna-cinzaEscuro/70 dark:text-cogna-cinzaClaro/70 max-w-2xl mx-auto">
              Confira os principais eventos acadêmicos que estão acontecendo em todo o Brasil
            </p>
          </div>

          {/* Grid de eventos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <div key={event.id} className="group bg-white dark:bg-cogna-cinzaEscuro rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-cogna-cinzaEscuro/10 dark:border-cogna-cinzaClaro/10">
                {/* Imagem do evento */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Badge de destaque */}
                  {event.featured && (
                    <div className="absolute top-4 left-4 bg-cogna-amarelo text-cogna-cinzaEscuro px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star size={14} className="fill-current" />
                      <span>Destaque</span>
                    </div>
                  )}
                  {/* Tipo do evento */}
                  <div className="absolute top-4 right-4 bg-cogna-roxo text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {event.type}
                  </div>
                </div>

                {/* Conteúdo do evento */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-3 line-clamp-2 group-hover:text-cogna-roxo transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-cogna-cinzaEscuro/70 dark:text-cogna-cinzaClaro/70">
                      <Calendar size={16} />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-cogna-cinzaEscuro/70 dark:text-cogna-cinzaClaro/70">
                      <MapPin size={16} />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-cogna-cinzaEscuro/70 dark:text-cogna-cinzaClaro/70">
                      <Users size={16} />
                      <span className="text-sm">{event.attendees} participantes</span>
                    </div>
                  </div>

                  {/* Preço e botão */}
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-cogna-roxo">
                      {event.price}
                    </div>
                    <button className="bg-cogna-cinzaEscuro dark:bg-cogna-cinzaClaro text-cogna-cinzaClaro dark:text-cogna-cinzaEscuro px-4 py-2 rounded-lg hover:bg-cogna-roxo hover:text-white transition-colors">
                      Inscrever-se
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botão "Ver Todos os Eventos" */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center space-x-2 bg-cogna-cinzaEscuro dark:bg-cogna-cinzaClaro text-cogna-cinzaClaro dark:text-cogna-cinzaEscuro px-8 py-3 rounded-xl font-semibold hover:bg-cogna-roxo hover:text-white transition-all duration-300">
              <span>Ver Todos os Eventos</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section - Mantida mas simplificada */}
      <section className="py-20 bg-cogna-cinzaClaro dark:bg-cogna-cinzaEscuro">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
            Por que escolher nosso portal?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white dark:bg-cogna-cinzaEscuro rounded-lg shadow-sm">
              <div className="bg-cogna-roxo w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
                Eventos Diversificados
              </h3>
              <p className="text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
                Seminários, workshops, conferências e muito mais para todos os níveis acadêmicos.
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-cogna-cinzaEscuro rounded-lg shadow-sm">
              <div className="bg-cogna-amarelo w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
                Networking Acadêmico
              </h3>
              <p className="text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
                Conecte-se com pesquisadores, professores e estudantes de todo o Brasil.
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-cogna-cinzaEscuro rounded-lg shadow-sm">
              <div className="bg-cogna-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
                Eventos Híbridos
              </h3>
              <p className="text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
                Participe presencialmente ou remotamente, com a mesma qualidade de experiência.
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-cogna-cinzaEscuro rounded-lg shadow-sm">
              <div className="bg-cogna-roxo w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
                Flexibilidade
              </h3>
              <p className="text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
                Eventos em diferentes horários e formatos para se adequar à sua agenda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mantida */}
      <section className="bg-cogna-cinzaEscuro dark:bg-cogna-cinzaClaro py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-cogna-cinzaClaro dark:text-cogna-cinzaEscuro">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-8 text-cogna-cinzaClaro dark:text-cogna-cinzaEscuro">
            Junte-se à comunidade acadêmica da Cogna Educação e participe de eventos transformadores.
          </p>
          <button className="bg-cogna-roxo text-white px-8 py-3 rounded-lg font-semibold hover:bg-cogna-cinzaEscuro dark:hover:bg-cogna-cinzaClaro hover:text-cogna-cinzaClaro dark:hover:text-cogna-cinzaEscuro transition-colors">
            Começar Agora
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home; 