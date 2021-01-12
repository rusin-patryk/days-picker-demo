<template>
  <div class="days-picker">
    <div class="days-picker__container">
      <div class="days-picker__header">
        header
      </div>
      <div class="days-picker__week-days">
        <div>_1</div>
        <div>_2</div>
        <div>_3</div>
        <div>_4</div>
        <div>_5</div>
        <div>_6</div>
        <div>_7</div>
      </div>
      <div class="days-picker__days">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
      </div>
      <div class="days-picker__actions">
        actions
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DaysPicker',
};
</script>

<style
    scoped
    lang="scss"
>

@import '../styles/DaysPicker';

</style>
