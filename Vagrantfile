Vagrant.configure("2") do |config|
  config.vm.define "debian" do |debian|
    debian.vm.box = "debian/bookworm64"
    debian.vm.hostname = "debian-vm"
    debian.vm.network "private_network", ip: "192.168.57.103"
    
    #Instalo Nginx y configurar el sitio web
    debian.vm.provision "shell", name: "update", inline: <<-SHELL
      sudo apt update
      sudo apt install -y nginx
      sudo apt install -y git
    
      #Creo las carpetas para la web
      sudo mkdir -p /var/www/webGerman/html
      sudo chown -R www-data:www-data /var/www/webGerman/html
      sudo chmod -R 755 /var/www/webGerman

      #Clono el repositorio para la web
      git clone https://github.com/cloudacademy/static-website-example /var/www/webGerman/html

      #Copio el archivo de configuración de Nginx desde el host a la máquina virtual
      sudo cp /vagrant/dominioGerman /etc/nginx/sites-available/dominioGerman

      #Creo el EnlSimb para habilitar el sitio
      sudo ln -s /etc/nginx/sites-available/dominioGerman /etc/nginx/sites-enabled/

      #Esto que salga como test is successful porfavor
      sudo nginx -t

      # Reiniciar Nginx para aplicar la configuración
      sudo systemctl restart nginx
    SHELL
  end
end
