
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Developer information
const developers = [
  {
    name: 'Василий Гурьянов',
    role: 'Командир экипажа',
  },
  {
    name: 'Алексей Тучный',
    role: 'Руководитель backend, второй пилот',
  },
  {
    name: 'Вячеслав Попов',
    role: 'DevOps-ер',
  },
  {
    name: 'Вадим Хавкин',
    role: 'Fashion-дизайнер',
  },
  {
    name: 'Евгений Лазарев',
    role: 'Тестировщик-испытатель',
  },
  {
    name: 'Иван Иванов',
    role: 'Второй бэкендер',
  },
  {
    name: 'Андрей Тарусов',
    role: 'Скрам сэнсей',
  }
];

const Footer = () => {
  return (
    <footer className="border-t border-border py-10 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8" style={{ marginLeft: '30px' }}>
          <div>
            <h3 className="text-lg font-semibold mb-4">О проекте</h3>
            <p className="text-muted-foreground mb-4">
              ХакХаб - платформа для объединения команд и участия в хакатонах. Найдите свою идеальную команду или создайте свою собственную!
            </p>
            <p className="text-muted-foreground">
              © 2023-2025 ХакХаб. Все права защищены.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Наша команда мечты</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {developers.map((developer, index) => (
                <div key={index} className="flex flex-col">
                  <span className="font-medium">{developer.name}</span>
                  <span className="text-sm text-muted-foreground">{developer.role}</span>
                  <div className="flex mt-2 space-x-2">
                    <a href={developer.github} target="" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      
                    </a>
                    <a href={developer.linkedin} target="" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      
                    </a>
                    <a href={`mailto:${developer.email}`} className="text-muted-foreground hover:text-primary">
                      
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary"></a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Каперская грамота короля Георга IV</a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Github size={18} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
