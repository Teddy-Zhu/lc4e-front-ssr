<template>
  <i-row class="topic-line">
    <i-col :span="24">
      <table class="topic-table">
        <tbody>
        <tr>
          <td align="center" width="10%">
            <a class="topic-author-img-a">
              <router-link :to="getUserUrl(data.authorId)" :src="getAvatar(data.authorImg)" tag="img"
                           class="topic-line-img"></router-link>
            </a>
          </td>
          <td align="left" width="75%">
            <router-link :to="getTopicUrl(data.url)" tag="div" class="topic-line-title">
              {{data.title}}
            </router-link>
            <div class="topic-line-meta">
              <i-breadcrumb separator="/">
                <i-breadcrumb-item :href="getAreaUrl(data.areaAbbr)">
                  <i-tag size="small">
                    <i-icon type="ionic"></i-icon>
                    {{data.areaAbbr}}
                  </i-tag>
                </i-breadcrumb-item>
                <i-breadcrumb-item :href="getUserUrl(data.authorId)">
                  <i-tag class="clickable" size="small">
                    <i-icon type="person"></i-icon>
                    {{data.authorNick}}
                  </i-tag>
                </i-breadcrumb-item>
                <i-breadcrumb-item>
                  <i-tag class="clickable" size="small">
                    <i-icon type="document-text"></i-icon>
                    {{data.commentCount}}
                  </i-tag>
                </i-breadcrumb-item>
                <i-breadcrumb-item>
                  <i-tag size="small">
                    <i-icon type="ios-time-outline"></i-icon>
                    {{getDate(data.createTime)}}
                  </i-tag>
                </i-breadcrumb-item>
              </i-breadcrumb>
            </div>
          </td>
          <td align="right">
            <i-tag color="yellow" v-for="label in splitText(data.texts)"
                   :key="label" size="small">{{label}}
            </i-tag>
          </td>
        </tr>
        </tbody>
      </table>
    </i-col>
  </i-row>
</template>
<style>
  .topic-author-img-a {
    display: inline-block;
    margin: 0 5px;
  }

  .el-tag.clickable {
    cursor: pointer;
  }

  .topic-line-img {
    width: 4em;
    height: 4em;
    cursor: pointer;
  }

  .topic-table {
    width: 100%;
  }

  .topic-line {
    padding: .3em 0;
    border-bottom: 1px solid #c2c8dc;
    border-left: 0 solid #505c6f;
    transition: box-shadow 500ms, border-left 70ms;
  }

  .topic-line:hover {
    background-color: white;
    border-left: 5px solid #505c6f;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }

  .topic-line-title {
    word-break: break-all;
    word-wrap: break-word;
    display: inline-block;
    text-align: left;
    cursor: pointer;
    font-size: 1.4em;
    line-height: 1.1em;
  }

  .topic-line-title:after {
    width: 100%;
    height: 2px;
    background-color: #4183C4;
    content: '';
    -webkit-transition: all 0.2s;
    -webkit-backface-visibility: hidden;
    transition: all 0.2s;
    backface-visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    clear: both;
    display: block;
  }

  .topic-line-title:hover:after {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }

  .topic-line-meta {
    margin-top: .2em;
  }

  .topic-line-body {

  }
</style>
<script>
  export default {
    name: 'sg-topic-Line',
    data () {
      return {}
    },
    props: {
      avatarUrl: {
        type: String,
        required: true
      },
      data: {
        type: Object
      }
    },
    methods: {
      getAreaUrl (id) {
        return '/a/' + id
      },
      getTopicUrl (id) {
        return '/t/' + id
      },
      getUserUrl (id) {
        return '/i/' + id
      },
      getAvatar (img) {
        return this.avatarUrl.replace('{md5}', img || '84fe01dba7e12fbae34fd2b7ea3b18a6')
      },
      splitText (str) {
        if (!str) return []
        return str.split(',')
      },
      getDate (d) {
        return new Date(d).toLocaleString()
      }
    },
    components: {}
  }
</script>
