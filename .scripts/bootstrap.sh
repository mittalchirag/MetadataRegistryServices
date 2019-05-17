cd;
sudo apt-get install -y nodejs npm default-jre;

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4;
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list;
sudo apt-get update;
sudo apt-get install -y mongodb-org;

wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.6.4.deb;
sudo dpkg -i elasticsearch-5.6.4.deb;
sudo sed -i 's/Xms2g/Xms500m/g' /etc/elasticsearch/jvm.options;
sudo sed -i 's/Xmx2g/Xmx1g/g' /etc/elasticsearch/jvm.options;
