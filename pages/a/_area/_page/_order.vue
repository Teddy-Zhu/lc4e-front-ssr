<template>
  <i-row type="flex" justify="center" class="sg-body">
    <i-col span="22">
      <i-row v-if="isHome">
        <i-col :span="24">
          <i-alert closable>站点开发中~~~</i-alert>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="15">
          <i-row type="flex" justify="space-between" align="middle">
            <i-col :span="13" class="br-path">
              <i-breadcrumb separator=">">
                <i-breadcrumb-item href="/">{{$t('home')}}</i-breadcrumb-item>
                <i-breadcrumb-item :href="'/a/' + area" v-if="!isHome">{{area}}</i-breadcrumb-item>
              </i-breadcrumb>
            </i-col>
            <i-col :span="10">
              <i-row type="flex" justify="end">
                <i-col :span="6">
                  <i-button type="primary" icon="edit" @click="newTopic" v-if="user.id">{{$t('button.publishTopic')}}
                  </i-button>
                </i-col>
                <i-col :span="12" :offset="1">
                  <i-select v-model="order">
                    <i-option v-for="orderItem in orders" :key="orderItem.value" :value="orderItem.value">
                      {{orderItem.label}}
                    </i-option>
                  </i-select>
                </i-col>
              </i-row>
            </i-col>
          </i-row>
          <i-row>
            <i-col :span="24">
              <sg-topic-Line :data="data" v-for="data in topics" :key="data.url"
                             :avatarUrl="base.userImg"></sg-topic-Line>
            </i-col>
          </i-row>
          <i-row type="flex" justify="center">
            <i-col :span="24" class="pager-center">
              <i-page class="inline-block" :current.sync="page" :total="total" size="small" show-elevator
                      :page-size="size"></i-page>
            </i-col>
          </i-row>
        </i-col>
        <i-col :span="7" :offset="1">
          <i-row class="topic-hot" v-if="isHome">
            <i-col :span="24">
              <h3>Topic Hot</h3>
            </i-col>
            <i-col :span="24" class="topic-hot-line" v-for="hot in hots" :key="hot.url">
              <i-tag color="blue">
                <router-link tag="a" :to="'/a/' + hot.abbr">{{hot.name}}</router-link>
              </i-tag>
              <router-link tag="a" :to="'/t/' + hot.url">{{hot.title}}</router-link>
            </i-col>
          </i-row>
          <i-row class="topic-hot" v-else>
            <i-col :span="24">
              <h3>{{area}}</h3>
            </i-col>
            <i-col :span="24" class="topic-hot-line">
              <p>{{areaDescription}}</p>
            </i-col>
          </i-row>
        </i-col>
      </i-row>
    </i-col>
  </i-row>
</template>
<style type="text/css">

  .topic-hot-line {
    margin: 5px 0;
    border-bottom: 1px solid #c2c8dc;
    padding-left: 5px;
    padding-bottom: 5px;
  }

  .topic-hot-line a {
    display: inline;
  }

  .topic-hot div:first-child h3 {
    text-align: center;
    margin: .4em 0;
  }

  .topic-hot {
    min-height: 100px;
    padding: 10px 0;
    margin-bottom: 1rem;
    border-radius: 0.2em;
  }

  .topic-hot-line a {
    text-decoration: none;
    color: black;
  }

  .pager-center {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .inline-block {
    display: inline-block;
  }

  .br-path {
    margin: 10px 0;
  }

</style>
<script type="text/javascript">
  import TopicLine from '~/components/topicLine.vue'
  import { mapState } from 'vuex'
  import Api from '~/plugins/api'
  import ajax from '~/plugins/axios'

  export default {
    middleware: 'base',
    async asyncData ({params, app}) {
      const data = {
        size: 20,
        total: 0,
        hots: [],
        page: params.page || '1',
        order: params.order || '1',
        area: params.area || 'all'
      }

      let url = '/a/' + data.area + '/' + data.page + '/' + data.order
      await ajax.post(url).then(function (response) {
        if (response.data.result) {
          data.topics = response.data.data.topics.result
          data.page = response.data.data.topics.pageNumber
          data.total = response.data.data.topics.totalCount
          data.size = response.data.data.topics.pageSize
        } else {
          app.$Message.error(response.data.message.length > 40 ? response.data.message.substring(0, 40) + '...' : response.data.message)
        }
      }).catch(function () {
        app.$Message.error('数据获取错误')
      })

      if (params.area === 'all') {
        await ajax.post(Api.topicHot).then(function (response) {
          if (response.data.result) {
            data.hots = response.data.data.topics
          } else {
            app.$Message.error(response.data.message.length > 40 ? response.data.message.substring(0, 40) + '...' : response.data.message)
          }
        })
      }
      console.log('end data')
      return data
    },
    layout: 'front',
    computed: {
      ...mapState({
        orders: state => state.order,
        user: state => state.user,
        base: state => state.base
      }),
      isHome: function () {
        return this.area === 'all'
      }
    },
    watch: {
      page (val, OldVal) {
        if (val !== OldVal) {
          this.$router.push((this.area === 'all' ? '/' : ('/a/' + this.area + '/')) + this.page + '/' + this.order)
        }
      },
      order (val, OldVal) {
        if (val !== OldVal) {
          this.$router.push((this.area === 'all' ? '/' : ('/a/' + this.area + '/')) + this.page + '/' + this.order)
        }
      }
    },
    methods: {
      newTopic () {
        this.$router.push('/t/new/')
      }
    },
    components: {
      'sg-topic-Line': TopicLine
    }
  }
</script>
