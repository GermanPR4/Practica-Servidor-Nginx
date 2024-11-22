Vagrant.configure("2") do |config|
  config.vm.define "debian" do |debian|
    debian.vm.box = "debian/bookworm64"
    debian.vm.hostname = "debian-vm"
    debian.vm.network "private_network", ip: "192.168.57.103"

    debian.vm.provision "shell", name: "setup", inline: <<-SHELL
      sudo apt update
      sudo apt install -y nginx git vsftpd ufw openssl

      #Configuración de Firewall
      sudo ufw allow 21/tcp
      sudo ufw allow 40000:50000/tcp
      sudo ufw enable

      #Creo usuario FTP
      sudo adduser --disabled-password --gecos "" userftp
      sudo mkdir -p /home/userftp/ftp
      sudo chown userftp:userftp /home/userftp/ftp
      sudo chmod 755 /home/userftp/ftp

      #Configuro contraseña del usuario FTP
      echo "userftp:12345" | sudo chpasswd

      #Copio certificados y configuración de FTPS
      cp /vagrant/vsftpd.key /etc/ssl/private/vsftpd.key
      cp /vagrant/vsftpd.crt /etc/ssl/certs/vsftpd.crt
      cp /vagrant/vsftpd.conf /etc/vsftpd.conf

      #Reinicio el servicio de vsftpd
      sudo systemctl restart vsftpd

      #Configuración de Nginx
      sudo mkdir -p /var/www/webGerman/html
      sudo chown -R www-data:www-data /var/www/webGerman/html
      sudo chmod -R 755 /var/www/webGerman
      git clone https://github.com/cloudacademy/static-website-example /var/www/webGerman/html
      sudo cp /vagrant/web1 /etc/nginx/sites-available/web1
      sudo ln -s /etc/nginx/sites-available/web1 /etc/nginx/sites-enabled/

      sudo mkdir -p /var/www/webGerman2/html
      sudo chown www-data:www-data /var/www/webGerman2/html
      sudo chmod 755 /var/www/webGerman2/html
      sudo cp /vagrant/web2 /etc/nginx/sites-available/web2
      sudo ln -s /etc/nginx/sites-available/web2 /etc/nginx/sites-enabled/

      #Doy permisos de lectura/escritura a userftp en las carpetas web
      sudo chown -R userftp:userftp /var/www/webGerman/html
      sudo chown -R userftp:userftp /var/www/webGerman2/html
      sudo chmod -R 755 /var/www/webGerman/html
      sudo chmod -R 755 /var/www/webGerman2/html

      #Reiniciar el servicio de vsftpd
      sudo systemctl restart vsftpd



      #PRACTICA 2 (AUTOENTICACIÓN)

      # Creo los usuarios con contraseñas cifradas
      sudo sh -c "echo 'German:$(openssl passwd -apr1 German)' >> /etc/nginx/.htpasswd"
      sudo sh -c "echo 'Pena:$(openssl passwd -apr1 Pena)' >> /etc/nginx/.htpasswd"

      # Establezco los permisos del archivo .htpasswd
      sudo chmod 644 /etc/nginx/.htpasswd
      sudo chown root:www-data /etc/nginx/.htpasswd

      # Creo los directorios y asigno los permisos correctos
      sudo mkdir -p /var/www/webPerfect/html
      sudo chown www-data:www-data /var/www/webPerfect/html
      sudo chmod 755 /var/www/webPerfect/html

      # Copio los archivos de la web desde el directorio de Vagrant a la máquina virtual
      sudo cp -r /vagrant/webPerfect/* /var/www/webPerfect/html/

      # Copio el archivo de configuración de NGINX desde el directorio de Vagrant
      sudo cp /vagrant/web3 /etc/nginx/sites-available/web3
      sudo ln -s /etc/nginx/sites-available/web3 /etc/nginx/sites-enabled/

      # Creo el enlace simbólico para habilitar el sitio
      sudo ln -s /etc/nginx/sites-available/web3 /etc/nginx/sites-enabled/






      sudo nginx -t
      sudo systemctl restart nginx
    SHELL
  end
end

