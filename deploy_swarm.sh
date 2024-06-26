#!/bin/bash

# Fonction pour installer Docker sur une instance Multipass
install_docker() {
    local instance_name=$1
    multipass exec "$instance_name" -- sudo apt-get update
    multipass exec "$instance_name" -- sudo apt-get install -y docker.io

    # Ajouter la clé GPG officielle de Docker
    multipass exec "$instance_name" -- sudo apt-get update
    multipass exec "$instance_name" -- sudo apt-get install -y ca-certificates curl
    multipass exec "$instance_name" -- sudo mkdir -p /etc/apt/keyrings
    multipass exec "$instance_name" -- sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker-archive-keyring.gpg > /dev/null

    # Ajouter le repository Docker aux sources APT
    multipass exec "$instance_name" -- echo "deb [arch=$(multipass exec "$instance_name" -- dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(multipass exec "$instance_name" -- lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    multipass exec "$instance_name" -- sudo apt-get update
}

# Fonction pour rejoindre un cluster Docker Swarm
join_swarm() {
    local instance_name=$1
    local join_command=$2
    multipass exec "$instance_name" -- $join_command
}

# Lancement des instances Multipass (si elles existent déjà, elles ne seront pas relancées)
multipass launch --name master
multipass launch --name worker1
multipass launch --name worker2

# Installation de Docker sur toutes les instances
install_docker master
install_docker worker1
install_docker worker2

# Initialisation du cluster Docker Swarm sur l'instance master
SWARM_INIT_OUTPUT=$(multipass exec master -- sudo docker swarm init --advertise-addr $(multipass info master | grep IPv4 | awk '{print $2}'))

# Récupération du token pour joindre le cluster
JOIN_TOKEN=$(multipass exec master -- sudo docker swarm join-token worker -q)

# Commande de join pour les workers
JOIN_COMMAND="sudo docker swarm join --token $JOIN_TOKEN $(multipass info master --format json | jq -r '.info.master.ipv4[0]'):2377"

# Joindre les workers au cluster
join_swarm worker1 "$JOIN_COMMAND"
join_swarm worker2 "$JOIN_COMMAND"

# Clonage du repository GitHub du projet
multipass exec master -- git clone https://github.com/ecabral12/projet_js.git

# Démarrage d'un registry Docker sur l'instance master
multipass exec master -- sudo docker service create --name registry -p 5000:5000 registry

# Construction et push des images vers le registry local
multipass exec master -- bash -c "cd projet_js/backend && sudo docker image build -t 127.0.0.1:5000/backend_image:latest -f Dockerfile ."
multipass exec master -- bash -c "cd projet_js/frontend && sudo docker image build -t 127.0.0.1:5000/frontend_image:latest -f Dockerfile ."
multipass exec master -- sudo docker image push 127.0.0.1:5000/backend_image:latest
multipass exec master -- sudo docker image push 127.0.0.1:5000/frontend_image:latest

# Déploiement du stack Docker Compose sur Docker Swarm
multipass exec master -- sudo docker stack deploy -c projet_js/docker-compose-swarm.yml mon_projet

# Affichage des services déployés
multipass exec master -- sudo docker stack services mon_projet

