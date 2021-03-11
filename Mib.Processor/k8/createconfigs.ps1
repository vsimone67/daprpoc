kubectl delete secret appsettings-secret-mibprocessor --namespace daprpoc
 
kubectl delete configmap appsettings-mibprocessor --namespace daprpoc

kubectl create secret generic appsettings-secret-mibprocessor --namespace daprpoc --from-file=../appsettings.secrets.json

kubectl create configmap appsettings-mibprocessor --namespace daprpoc --from-file=../appsettings.json