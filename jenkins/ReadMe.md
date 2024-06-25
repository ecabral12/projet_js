# Documentation Technique

## Installation de Jenkins

### Prérequis

- Docker doit être installé sur votre machine. Suivez les instructions sur [Docker Docs](https://docs.docker.com/get-docker/) pour installer Docker.

### Étapes d'Installation

1. **Installer Docker** :
   - Suivez les instructions sur [Docker Docs](https://docs.docker.com/get-docker/) pour installer Docker sur votre machine dédiée.

2. **Installer Jenkins** :
   - Lancez Jenkins dans un conteneur Docker avec la commande suivante :
     ```bash
     docker run -d -p 8080:8080 -p 50000:50000 --name jenkins jenkins/jenkins:lts
     ```

3. **Accéder à Jenkins** :
   - Ouvrez un navigateur et allez à `http://localhost:8080` pour accéder à l'interface de Jenkins.
   - Suivez les instructions pour compléter l'installation initiale (récupération du mot de passe initial, installation des plugins recommandés, etc.).

## Configuration des Pipelines Jenkins

### Créer un Pipeline Jenkins

1. **Accédez à Jenkins** :
   - Ouvrez Jenkins dans votre navigateur à `http://localhost:8080`.

2. **Créer un Nouveau Job** :
   - Cliquez sur "New Item".
   - Entrez un nom pour le job.
   - Sélectionnez "Pipeline" et cliquez sur "OK".

3. **Configurer le Pipeline** :
   - Dans la section "Pipeline", sélectionnez "Pipeline script from SCM".
   - Choisissez "Git" et entrez l'URL du repository : `https://github.com/ecabral12/projet_js.git`.
   - Sélectionnez la branche `main`.

### Exemple de Jenkinsfile

Créez un fichier nommé `Jenkinsfile` à la racine de votre repository avec le contenu suivant :

```groovy
pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "projet_js-backend"
        FRONTEND_IMAGE = "projet_js-frontend"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/ecabral12/projet_js.git'
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend') {
                    script {
                        docker.image('node:14').inside {
                            sh 'npm install'
                            sh 'npm test'
                        }
                    }
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        docker.image('node:14').inside {
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    // Build backend Docker image
                    sh """
                    cd backend
                    docker build -t ${BACKEND_IMAGE} .
                    cd ..
                    """
                    // Build frontend Docker image
                    sh """
                    cd frontend
                    docker build -t ${FRONTEND_IMAGE} .
                    cd ..
                    """
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    // Push backend Docker image
                    sh "docker tag ${BACKEND_IMAGE} dockerhub/${BACKEND_IMAGE}:latest"
                    sh "docker push dockerhub/${BACKEND_IMAGE}:latest"
                    
                    // Push frontend Docker image
                    sh "docker tag ${FRONTEND_IMAGE} dockerhub/${FRONTEND_IMAGE}:latest"
                    sh "docker push dockerhub/${FRONTEND_IMAGE}:latest"
                }
            }
        }
        stage('Deploy to Swarm') {
            steps {
                script {
                    sh 'docker stack deploy -c docker-compose.yml my_stack'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

