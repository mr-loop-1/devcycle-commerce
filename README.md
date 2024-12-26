# Devcycle Commmerce - Live Sale and Simulation

A Sale and Simulation system demonstrating the power of feature flags from Devcycle. The blog post can be read [here at dev.to](https://dev.to/iabdsam/devcycle-commerce-live-sale-2epg)

<img src="https://github.com/user-attachments/assets/589bc78b-5758-4b5f-aa3e-0eb564cddb40" height="400" />

### Description

This application consists of a website and a system of modification of its UI and data coming from backend using feature flags. The changes range from subtle color changes to entire layouts and combination of feature flags.

There is a simulation pane in the application where a user can experience feature flags in real time while making decisions for a sample company's business.

## Setup

There are two separate components in the application, namely frontend and dashboard. They can be run together when credentails are of same project and can also be of different projects on devcycle's platform.

```
git clone --depth 1 https://github.com/mr-loop-1/devcycle-commerce
```

I have use Node v20.18.0 to develop them.

### dashboard

The dashboard is stateless and hence everytime it is run or gets an error, it would need a new project to start with and create all features with default variations.

The reason for being stateless is, otherwise the dashboard would have to validate the state of devcycle data before it can proceeed which is very complex.

```
npm install
npm run dev
```

it will start at port `5174`.

The dashboard requires an api key to authenticate which can be obtained using

```
curl --request POST \
  --url "https://auth.devcycle.com/oauth/token" \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=client_credentials \
  --data audience=https://api.devcycle.com/ \
  --data client_id=<client id> \
  --data client_secret=<client secret>
```

### website

the website requires an env variable `VITE_SDK_KEY`. It can be get from the Devcycle dashboard in the project's client sdk key in development environment.

Since, the website requires the features and variations to be already present, hence the dashboard needs to be run first and initialize a new project. Its key is incrementing `ecom-[number]` and displayed on dashboard too. Then, that project can be used with the website. It is not necessary to keep the dashboard runnning but it will give an easy way to update the flags and see the changes on website.

```
npm install
npm run dev
```

it will start at port `5173`

### State and Reference

A Full Reference of all feature flags, variables and variations used in the project can be seen at both website and dashboard. The website also features the current state of variations used in the selected country while the dashboard has the same for all countries.

Feel free to create an issue or PR

## Architecture & Photos

<img src="https://github.com/user-attachments/assets/9bccfe04-c96e-4630-8073-d80d402bce44" height="400" />

<img src="https://github.com/user-attachments/assets/69f5650c-e801-49b6-853f-844702fdcb74" height="400" />

<img src="https://github.com/user-attachments/assets/5134d000-87d9-4905-98ae-1e092e3573ff" height="400" />

<img src="https://github.com/user-attachments/assets/b4f86aa9-0730-4070-8ce3-996409ce1609" height="400" />
