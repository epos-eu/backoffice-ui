#!/bin/bash -e

export DOCKER_PULL_TOKEN="pitefnk6oXYsqpVTxcE8" #"AdJ6uSuVny6NL7TkxDNk" #"pitefnk6oXYsqpVTxcE8"
export CI_REGISTRY=epos-ci.brgm.fr:5005 # hwdocker.bgs.ac.uk #
kubectl create ns $K8S_NAMESPACE_TO_DEPLOY || true
kubectl config set-context kube --namespace=${K8S_NAMESPACE_TO_DEPLOY}

kubectl apply -f ./k8-deploy.yml
