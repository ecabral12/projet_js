Voici une version améliorée du rapport de projet, en tenant compte des corrections et des ajustements nécessaires :

---

# Rapport de projet
### Panorama du cloud & déploiement AWS

## Étape 1 : Préparation du projet
### 1.1 Choix du projet
Pour ce projet, nous avons sélectionné un projet JavaScript existant comme base. Vous pouvez trouver le dépôt original [ici](https://github.com/ecabral12/projet_js).

---

## Étape 2 : Docker
### 2.1 Dockerfile
Nous avons créé deux Dockerfiles, un pour le frontend et un pour le backend.

- **Frontend :** [Dockerfile](/frontend/Dockerfile)
- **Backend :** [Dockerfile](/backend/Dockerfile)

### 2.2 docker-compose.yml
Le fichier [docker-compose.yml](app/docker-compose.yml) à la racine du projet permet d'orchestrer les services Docker.

Pour démarrer les services, utilisez la commande suivante :
```sh
docker-compose up --build
```

Une fois lancé, l'application est accessible à l'adresse `http://localhost:5173`.

**Capture d'écran de l'application en cours d'exécution :**

![image](https://github.com/ecabral12/projet_js/assets/160595084/a6b155b4-bf71-4184-8979-e53be5a6c67a)


**Résultat de l'application sur `localhost:5173` :**

![image](https://github.com/ecabral12/projet_js/assets/160595084/dd1e44e4-0329-4b1a-b7a1-4ca0f26eaecf)


---

## Étape 3 : Docker Swarm
### 3.1 Déploiement avec Docker Swarm via Multipass

Pour déployer avec Docker Swarm, utilisez le script fourni :
```sh
./deploy_swarm.sh
```

Vous pouvez également suivre les instructions détaillées dans le README.md du dossier `swarm` pour un déploiement manuel.

---

## Étape 4 : Terraform et Ansible avec AWS
### 4.1 Informations de connexion AWS

Avant de commencer, assurez-vous d'avoir récupéré votre **access key** et **secret key** AWS. De plus, créez une paire de clés nommée **"myKey"** dans AWS pour la connexion SSH aux instances EC2.

### 4.2 Terraform

Voici les étapes pour déployer avec Terraform :

```sh
cd terraform

# Remplacez les valeurs XXX par votre access key et secret key dans variables.tfvars
echo 'aws_access_key = "XXX"\naws_secret_key = "XXX"' > variables.tfvars

docker container run -it --rm -v $PWD:$PWD -w $PWD hashicorp/terraform init

docker build -t terraform .
docker run --rm -w /workspace terraform apply -auto-approve
```

Après une exécution réussie, une nouvelle instance EC2 sera créée sur AWS.

**Capture d'écran de Terraform en action sur AWS :**

![Image terraform AWS](images/image_terraform_aws.png)

### 4.3 Ansible

Avant d'exécuter Ansible, assurez-vous que votre clé `myKey.pem` est placée à la racine du projet et configurez l'inventaire dans `inventory.ini`.

Voici comment exécuter Ansible :

```sh
docker image build -t ansible:2.16 . 
docker container run --rm ansible:2.16 ansible-playbook -i inventory.ini playbook.yml
```

---

## Étape 5 : Initialisation de Jenkins

Pour l'initialisation de Jenkins, veuillez consulter le README.md du dossier `jenkins`.

---

Ce rapport détaille les étapes et les outils utilisés pour chaque phase du projet, en fournissant des instructions claires pour reproduire et déployer l'environnement aussi bien localement qu'avec des services cloud comme AWS.
