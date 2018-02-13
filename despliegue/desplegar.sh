#!/bin/bash
# git clone https://github.com/jorgeCabreraSanchez/TruekUp.git truekup → desde /opt/proyectoTruekup
# git config --global http.proxy http://172.16.0.9:8080
cd /opt/proyectoTruekup
mkdir html
mkdir mysql
mkdir database
cp -a truekup/html/. html/
cp -a truekup/database/. database/
docker run -d -p 80:8080 --net=red_docker --ip 192.168.1.80 --name html-truekup -v /opt/truekup/html:/var/www/html logongas/apache2-php7-ssl

docker run -d -p 3306:3306 --net=red_docker --ip 192.168.1.81 --name mysql-truekup -v /opt/truekup/mysql:/var/lib/mysql -v /opt/truekup/database:/database -e MYSQL_ROOT_PASSWORD=root mysql

             
# git update-index --chmod=+x import.sh → al crearlo

# Contenido del import.sh
#    #/bin/bash
#    mysql -u root -proot -h localhost -P 3306 bdtruekup < /database/bdtruekup.sql

docker exec -t mysql-truekup /bin/bash /database/import.sh
