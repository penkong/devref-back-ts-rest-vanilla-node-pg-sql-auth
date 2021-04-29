dockerNetwork:
	docker network create pg-net

# step 2 : create named volume for db and cache
volume: 
	docker volume create pgvol & docker volume create portainer_data

portainer:
	docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce

# step 3 : create database container 
postgres:
	docker run -d --network pg-net -p 5432:5432 --name pg13  -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -v pgvol:/var/lib/postgresql/data postgres

# step 2 : --link pg13:pg13
pgadmin:
	docker run -d --network pg-net -p 8005:80 --name pgadmin4  -e 'PGADMIN_DEFAULT_EMAIL=nazemi.works@gmail.com' -e 'PGADMIN_DEFAULT_PASSWORD=secret' dpage/pgadmin4
# check connection ip with docker logs pgadmin4

createdb: 
	docker exec -it pg13 createdb --username=root --owner=root devrefvanillanodesql


apibuilddev:
	cd server && docker build -t penkong/vanillanodepg -f Dockerfile.dev . 

apipushdevdocker:
	docker push penkong/vanillanodepg

composeup:
	cd server && docker-compose -f docker-compose.dev.yaml up -d --build

composedown:
	cd server && docker-compose -f docker-compose.dev.yaml down

removeAllVolumes:
	docker volume rm $(docker volume ls -q)

# ka == kubectl apply -f 
kuberup:
	cd k8s && kubectl apply -f secrets.k8s.yaml && kubectl apply -f confmap.k8s.yaml && kubectl apply -f .

kuberdown:
	cd k8s && kubectl delete -f .