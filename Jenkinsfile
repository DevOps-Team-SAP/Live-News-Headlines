pipeline {

    environment { 

        registry = "mohith321/newsapp" 

        registryCredential = 'dockerhub_cred' 

        dockerImage = '' 

    }

    agent any
    
    stages {
     
      stage('Set Up Enviornment') {
            steps {
            
              sh 'npm install'
                
            }
        }
         stage('Build') {
            steps {
              parallel(
                'build':{
                     echo 'Running Builds'
                        sh 'npm run build'
                },
                'test':{
                    echo 'Running Tests'
                    
                }
              )
            
            } 
        }
        
        stage('Deploy Image') {
                steps {
                       script { 
                      dockerImage = docker.build registry + ":$BUILD_NUMBER" 
                    }
                   script { 
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImage.push() 
                    }
                    
                   }
                  sh "docker rmi $registry:$BUILD_NUMBER"
                }
            
        }
        stage('Start Server') {
            steps {
                     
                  echo 'Server Starting...'
                  sh 'rm -r Ec2'
                  sh 'git clone https://github.com/Mohithraj916/Ec2.git'
                  sh 'cp Ec2/jenkins_mohith.pem .'
                  sh 'ls'
                  sh 'chmod 777 jenkins_mohith.pem'
                  sh 'ssh -i "jenkins_mohith.pem" ec2-user@ec2-100-25-151-71.compute-1.amazonaws.com -yes'
                  sh "docker pull $registry:$BUILD_NUMBER" 
                  sh 'logout'          
            }
        }
    }
   post {
    success {
   
      emailext (
          subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
          body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
            <p>Check console output at '<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>'</p>""",
          recipientProviders: [[$class: 'RequesterRecipientProvider']]
        )
    }

    failure {

      emailext (
          subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
          body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
            <p>Check console output at '<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>'</p>""",
          recipientProviders: [[$class: 'RequesterRecipientProvider']]
        )
    }

      always {
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])
            sh 'ls'
            sh 'ls -l'
        }
  }
    
}