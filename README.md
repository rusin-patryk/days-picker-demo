# Demo Day Picker

#### Settings of the component:

```javascript
// use prop settings of the BookingForm component
settings: {
  firstDayOfWeek: 1 // Number 1 if you want Monday to be the first day of the week, 0 to Sunday.
  allowedRange: {
    min: '2021-01-14' // The first date that can be selected. 
    max: '2021-01-15' // The last selectable date.
  }
}
```

#### Component returns:

```javascript
pickedRange: {
  dateFrom: '2021-01-14'
  dateTo: '2021-01-15'
}
```

To run this app you will need [yarn dependency manager](https://classic.yarnpkg.com/en/docs/install/#windows-stable).

Then install **Vue CLI** tool by run `yarn global add @vue/cli` in the console.

## Project setup

### Dependencies install

```
yarn install
```

### Compiles and hot-reloads for development

```
vue-cli-service serve
```

### Compiles and minifies for production

```
vue-cli-service build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
vue-cli-service lint
```

### Runs unit tests

```
vue-cli-service test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
