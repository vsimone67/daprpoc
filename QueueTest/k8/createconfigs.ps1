kubectl delete secret appsettings-secret-queuetest --namespace daprpoc
 
kubectl delete configmap appsettings-queuetest --namespace daprpoc

kubectl create secret generic appsettings-secret-queuetest --namespace daprpoc --from-file=../appsettings.secrets.json

kubectl create configmap appsettings-queuetest --namespace daprpoc --from-file=../appsettings.json