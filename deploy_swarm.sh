#!/bin/bash


install_docker() {
    local instance_name=$1
    multipass exec "$instance_name" -- sudo apt-get update
    # multipass exec "$instance_name" -- sudo apt-get install docker.io

    # Add Docker's official GPG key:
    multipass exec "$instance_name" -- sudo apt-get update
    multipass exec "$instance_name" -- sudo apt-get install ca-certificates curl
    multipass exec "$instance_name" -- sudo install -m 0755 -d /etc/apt/keyrings
    multipass exec "$instance_name" -- sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    multipass exec "$instance_name" -- sudo chmod a+r /etc/apt/keyrings/docker.asc

    # Add the repository to Apt sources:
    multipass exec "$instance_name" -- echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    multipass exec "$instance_name" -- sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    multipass exec "$instance_name" -- sudo apt-get update
}

join_swarm() {
    local instance_name=$1
    local join_command=$2
    multipass exec "$instance_name" -- $join_command
}

multipass launch --name master
multipass launch --name worker1
multipass launch --name worker2


install_docker master
install_docker worker1
install_docker worker2


SWARM_INIT_OUTPUT=$(multipass exec master -- sudo docker swarm init --advertise-addr $(multipass info master | grep IPv4 | awk '{print $2}'))


JOIN_TOKEN=$(multipass exec master -- sudo docker swarm join-token worker -q)


JOIN_COMMAND="sudo docker swarm join --token $JOIN_TOKEN $(multipass info master | grep IPv4 | awk '{print $2}'):2377"


join_swarm worker1 "$JOIN_COMMAND"
join_swarm worker2 "$JOIN_COMMAND"


multipass exec master -- git clone https://github.com/ecabral12/projet_js.git


multipass exec master -- sudo docker service create --name registry -p 5000:5000 registry


multipass exec master -- bash -c "cd projet_js/backend && sudo docker image build -t 127.0.0.1:5000/backend_image:latest -f Dockerfile ."
multipass exec master -- bash -c "cd projet_js/frontend && sudo docker image build -t 127.0.0.1:5000/frontend_image:latest -f Dockerfile ."
multipass exec master -- sudo docker image push 127.0.0.1:5000/backend_image:latest
multipass exec master -- sudo docker image push 127.0.0.1:5000/frontend_image:latest

multipass exec master -- sudo docker stack deploy -c docker-compose-swarm.yml mon_projet
multipass exec master -- sudo docker stack services mon_projet
