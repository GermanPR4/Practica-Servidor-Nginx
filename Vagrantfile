Vagrant.configure("2") do |config|
  config.vm.box = "debian/bookworm64"

  config.vm.define "debian" do |debian|
    debian.vm.hostname = "debian-vm"
    debian.vm.network "private_network", ip: "192.168.57.103"
    debian.vm.network "forwarded_port", guest: 80, host: 8080
    debian.vm.provision "shell", name: "update", inline: <<-SHELL
      sudo apt update
      sudo apt install -y nginx

      sudo mkdir -p /var/www/webDimension/html
      sudo cp -r /vagrant/webDimension/* /var/www/webDimension/html/
      sudo chown -R www-data:www-data /var/www/webDimension/html
      sudo chmod -R 755 /var/www/webDimension
    SHELL
  end
end
