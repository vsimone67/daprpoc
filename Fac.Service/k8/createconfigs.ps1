kubectl delete secret appsettings-secret-facservice --namespace daprpoc
 
kubectl delete configmap appsettings-facservice --namespace daprpoc

kubectl create secret generic appsettings-secret-facservice --namespace daprpoc --from-file=../appsettings.secrets.json

kubectl create configmap appsettings-facservice --namespace daprpoc --from-file=../appsettings.json