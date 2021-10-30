# Instructions for creating a new service from the boilerplate

1. Open your terminal

2. Create a bare clone of the repository

```
  $ git clone --bare git@github.com:rpp29-boc-rebecca-purple/services_boilerplate.git
```

4. Make a new, empty repo in the organization
6. Mirror-push to the new repository

```
  $ cd services_boilerplate.git
  $ git push --mirror git@github.com:rpp29-boc-rebecca-purple/NEW_REPO_NAME.git
```

4. Remove the temporary local repository you created earlier

```
  $ cd ..
  $ rm -rf services_boilerplate.git
```

5. Clone the new repo, install npm packages, and complete work as normal


### Sonar Cloud

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)
