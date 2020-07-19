# MONGODB CONTAINERIZE
Run your mongodb just in one command

## PREREQUIES
* Docker 15.*

## RUNNING
```shell
docker-compose -f docker-compose-mongodb.yml up
```
## DO NOT FORGET
Change access authentication

### DATAS
Your data will be synchronized on your own desktop at `~/data` 
___

### Adding ressources in container
First run the container, once is done copy the file or the folder that you what import  in your container : 
* For one specific file can be copied TO the container like:
  ```shell
  docker cp foo.txt mycontainer:/foo.txt
  ```
* One specific file can be copied FROM the container like:
  ```shell
  docker cp mycontainer:/foo.txt foo.txt
  ```
For emphasis, mycontainer is a container ID, not an image ID.

* Multiple files contained by the folder src can be copied into the target folder using:
  ```shell
  docker cp src/. mycontainer:/target
  ```

#### Import datas which imported
The keyword for import datas is `mongoimport`. To that you ahve to specify : 
* the database's name : `--db <name>`
* the collection's name : `--collection <name>`
* optionnally the authentication ids :
  * the authentication database `--authenticationDatabase <admin>`
  * username with which to authenticate to the MongoDB database `--username <username>` 
  * password with which to authenticate to the MongoDB database`--password password`

And finaly specify your file name.\
```shell
mongoimport --db <verbs> --collection <de> --authenticationDatabase <admin> --username <user> --password <password> $PATH_TO_FILE/de.json
```
Refresh your mongodb interface if you use to one like [robo3t](https://robomongo.org/)
____