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
      sudo apt-get install -y vsftpd
      sudo apt install ufw

      sudo ufw allow 21/tcp
      sudo ufw enable

      #Creo las carpetas para la web
      sudo mkdir -p /var/www/webGerman/html
      sudo chown -R www-data:www-data /var/www/webGerman/html
      sudo chmod -R 755 /var/www/webGerman

      #Clono el repositorio para la web
      git clone https://github.com/cloudacademy/static-website-example /var/www/webGerman/html

      #Copio el archivo de configuración de Nginx desde el host a la máquina virtual
      sudo cp /vagrant/web1 /etc/nginx/sites-available/web1

      #Creo el EnlSimb para habilitar el sitio
      sudo ln -s /etc/nginx/sites-available/web1 /etc/nginx/sites-enabled/

      sudo mkdir -p /home/vagrant/ftp
      sudo chown nobody:nogroup /home/vagrant/ftp
      sudo chmod 777 /home/vagrant/ftp

      sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/vsftpd.key -out /etc/ssl/certs/vsftpd.crt

      cp /vagrant/vsftpd.conf /etc/vsftpd.conf

      sudo systemctl restart vsftpd

      # Creo las carpetas para la web
      sudo mkdir -p /var/www/webGerman2/html
      sudo chown -R www-data:www-data /var/www/webGerman2/html
      sudo chmod -R 755 /var/www/webGerman2

      # Copio el contenido de web2holamundo al directorio de Nginx
      sudo cp -r /vagrant/web2holamundo/* /var/www/webGerman2/html/

      # Copio el archivo de configuración de Nginx desde el host a la máquina virtual
      sudo cp /vagrant/web2 /etc/nginx/sites-available/web2

      #Creo el EnlSimb para habilitar el sitio
      sudo ln -s /etc/nginx/sites-available/web2 /etc/nginx/sites-enabled/

      #Esto que salga como test is successful porfavor
      sudo nginx -t
      # Reiniciar Nginx para aplicar la configuración
      sudo systemctl restart nginx
    SHELL
  end
end
