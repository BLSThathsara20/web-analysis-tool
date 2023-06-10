<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-12" v-if="websiteData">
          <div class="alert" :class="analyticsStatusClass" role="alert">
            {{ analyticsStatusMessage }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <input v-model="websiteUrl" type="text" class="form-control" placeholder="Enter website URL">
          </div>
          <button @click="fetchWebsiteData" class="btn btn-primary">Fetch Website Data</button>

          <div class="mt-4" v-if="loading">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div class="mt-4" v-if="errorMessage">
            <div class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
          </div>

          <div class="mt-4" v-if="websiteData">
            <h2>{{ websiteData.title }}</h2>
            <h3>Titles</h3>
            <ul>
              <li v-for="title in websiteData.titles" :key="title.title">
                {{ title.title }} - {{ title.tag }}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <h2>Repeatable words</h2>
          <ul>
            <li v-for="word in repeatableWords" :key="word.word">
              {{ word.word }} - {{ word.count }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      websiteUrl: '',
      websiteData: null,
      repeatableWords: [],
      loading: false,
      errorMessage: '',
      isAnalyticsConnected: false,
      isTagManagerConnected: false,
    };
  },
  computed: {
    analyticsStatusClass() {
      if (this.websiteData && (this.isAnalyticsConnected || this.isTagManagerConnected)) {
        return 'alert-warning';
      } else {
        return 'alert-success';
      }
    },
    analyticsStatusMessage() {
      if (this.websiteData && (this.isAnalyticsConnected || this.isTagManagerConnected)) {
        return 'Analytics or Tag Manager connected.';
      } else {
        return 'Analytics and Tag Manager connected.';
      }
    },
  },
  methods: {
    fetchWebsiteData() {
      this.loading = true;
      this.errorMessage = '';

      if (!this.websiteUrl) {
        this.errorMessage = 'Please enter a website URL.';
        this.loading = false;
        return;
      }

      fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(this.websiteUrl))
        .then(response => response.json())
        .then(data => {
          if (data.status && data.status.http_code !== 200) {
            throw new Error('Failed to fetch website content. Please make sure the URL is valid and accessible.');
          }

          const html = data.contents;
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');

          const titleElement = doc.querySelector('title');
          const title = titleElement ? titleElement.textContent : '';

          const titleTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
          const titles = titleTags.map(tag => {
            const elements = doc.querySelectorAll(tag);
            return Array.from(elements).map(element => ({
              tag,
              title: element.textContent,
            }));
          }).flat();

          this.websiteData = {
            title,
            titles,
          };

          this.repeatableWords = this.getRepeatableWords(titles);
        })
        .catch(error => {
          this.errorMessage = error.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getRepeatableWords(titles) {
      const wordCounts = {};
      titles.forEach(title => {
        const words = title.title.split(/\s+/);
        words.forEach(word => {
          if (wordCounts[word]) {
            wordCounts[word]++;
          } else {
            wordCounts[word] = 1;
          }
        });
      });

      const repeatableWords = Object.keys(wordCounts).map(word => ({
        word,
        count: wordCounts[word],
      }));

      return repeatableWords.filter(word => word.count > 1);
    },
  },
  mounted() {
    // Check the connection status of Google Analytics and Google Tag Manager
    this.isAnalyticsConnected = !!window.ga && window.ga.create;
    this.isTagManagerConnected = !!window.gtag && window.gtag.create;
  },
};
</script>

<style scoped>
.container {
  margin-top: 40px;
}
.alert {
  margin-top: 20px;
}
</style>
