# Rapport de projet
### Panorama du cloud & déploiement AWS

## Étape 1 : Préparation du projet
### 1.1 Choix du projet
Pour le projet existant à utiliser, nous avons choisi un projet vu JS. 



Lien du dépôt : [ICI]https://github.com/ecabral12/projet_js.git
<hr>

## Étape 2 : Docker
### 2.1 Dockerfile
2 dcoker fiel un dasn  frontend et un dans backend
### 2.2 docker-compose.yml
Le fichier [docker-compose.yml](app/docker-compose.yml) est a la racine du projet .

Commande d'exécution : 
```sh
docker pull node
sudo docker-compose up --build
```

Résultat après avoir exécuté la commande :

![Image docker command](images/image_docker_app_running.png)

Résultat sur `localhost:5173` : 

![Image résultat](images/image_docker_app_result.png)

<hr>

## Étape 3 : Docker Swarm

### 3.1 Le script de déploiement avec multipass et docker swarm : 

Vous avez juste besoin de lancer le script :
```sh
doc
```

Ou faites ceci manuellement en suivant le README.md dans le dossier swarm.

<hr>

## Étape 4 : Terraform et Ansible avec AWS
### 4.1 Informations de connexion
1. Récupérer l'**access key** et la **secret key** de votre compte AWS.
2. Créer depuis l'interface AWS une **key pair** nommé **"myKey"** pour pouvoir se connecter à l'instance EC2. Puis télécharger le fichier `.pem` et le placer le à la racine du projet.

### 4.2 Terraform
Une fois les informations de connexion récupérées, il n'y a plus qu'à :

Commandes à exécuter : 
```sh
cd terraform

# Remplacer les valeurs avec votre access key et secret key
echo 'aws_access_key = "XXX"\naws_secret_key = "XXX"' > variables.tfvars

docker container run -it --rm -v $PWD:$PWD -w $PWD hashicorp/terraform init

docker build -t terraform .
docker run --rm -w /workspace terraform apply -auto-approve
```

Si toutes les informations demandées sont correctes, et une fois l'exécution réussi, la nouvelle instance a bien été créée sur AWS.

![Image terraform AWS](images/image_terraform_aws.png)


### 4.3 Ansible
Vous devez placer votre clé `myKey.pem` à la racine du projet si ça n'est pas déja fait, ainsi que changer l'adresse du server dans `inventory.ini`, puis éxecuter ces commandes :

```sh
docker image build -t ansible:2.16 . 
docker container run --rm ansible:2.16 ansible-playbook -i inventory.ini playbook.yml
```

### Étape 5 : initialisation de Jenkins

Pour lancer et tester Jenkins en local:
```sh
docker run -p 8080:8080 -p 50000:50000 --restart=on-failure jenkins/jenkins:2.430-jdk21
```
Sinon lancer le docker compose du projet, Jenkins est incorporé dedans

Jenkins nous fournit un mot de passe initial pour la première étape.

![Image mot de passe générée localement](images/jenkins/initialAdminPassword.png)

Nous avons le choix entre une installation traditionnel et une installation suggérée. Nous choisirons la seconde option.

![Suggested Install](images/jenkins/suggested%20install.png)

Une fois l'installation effectuée, nous créons l'utilisateur admin et sommes prêt à utiliser Jenkins.

On sélectionne New Item puis Freestyle project

![Freestyle project](images/jenkins/freestyle%20project.png)

Nous inscrivons l'url Git du projet et définissons la routine de mise à jour du Git

![Url Git](images/jenkins/github.png)
![build Triggers](images/jenkins/build%20triggers.png)

Jenkins est en marche, on peut lancer un premier Build manuel pour s'assurer du bon focntionnement du projet ou attendre la routine.

![Build Complete](/images/jenkins/build%20complete.png)
