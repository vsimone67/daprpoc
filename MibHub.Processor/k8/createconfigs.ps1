kubectl delete secret appsettings-secret-mibhubprocessor --namespace daprpoc
 
kubectl delete configmap appsettings-mibhubprocessor --namespace daprpoc

kubectl create secret generic appsettings-secret-mibhubprocessor --namespace daprpoc --from-file=../appsettings.secrets.json

kubectl create configmap appsettings-mibhubprocessor --namespace daprpoc --from-file=../appsettings.json