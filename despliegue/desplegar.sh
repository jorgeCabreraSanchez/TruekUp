#!/bin/bash
# este script debe tener permisos de ejecucion --> # git update-index --chmod=+x desplegar.sh
# git clone https://github.com/jorgeCabreraSanchez/TruekUp.git truekup → desde /opt/proyectoTruekup
# git config --global http.proxy http://172.16.0.9:8080
cd ../..
mkdir www
mkdir mysql
mkdir database
cp -a TruekUp/www/. www/
cp -a TruekUp/database/. database/

# docker network create -d bridge red_truekup

docker run -d -p 8080:80 --network=red_truekup --name html-truekup --hostname html-truekup -v /opt/truekup/www:/var/www/html logongas/apache2-php7-ssl

docker run -d -p 3306:3306 --network=red_truekup  --name mysql-truekup --hostname mysql-truekup -v /opt/truekup/mysql:/var/lib/mysql -v /opt/truekup/database:/database -e MYSQL_ROOT_PASSWORD=root mysql

sleep 1m


# git update-index --chmod=+x import.sh → al crearlo

# Contenido del import.sh
#    #/bin/bash
#    mysql -u root -proot -h localhost -P 3306 bdtruekup < /database/bdtruekup.sql

docker exec -t mysql-truekup /bin/bash /database/import.sh
