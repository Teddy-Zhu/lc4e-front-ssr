<template>
  <Col :span="22">
  <Row>
    <Col :span="24">
    <Alert closable>站点开发中~~~</Alert>
    </Col>
  </Row>
  <Row>
    <Col :span="15">
    <Row type="flex" justify="space-between" align="middle">
      <Col :span="13" class="br-path">
      <Breadcrumb separator=">">
        <Breadcrumb-item href="/">{{$t('home')}}</Breadcrumb-item>
      </Breadcrumb>
      </Col>
      <Col :span="10">
      <Row type="flex" justify="end">
        <Col :span="6">
        <Button type="primary" icon="edit" @click="newTopic" v-if="user.id">{{$t('button.publishTopic')}}</Button>
        </Col>
        <Col :span="12" :offset="1">
        <Select v-model="order">
          <Option v-for="orderItem in orders" :key="orderItem.value" :value="orderItem.value">
            {{orderItem.label}}
          </Option>
        </Select>
        </Col>
      </Row>
      </Col>
    </Row>
    <Row>
      <Col :span="24">
      <sg-topic-Line :data="data" v-for="data in topics" :key="data.url"
                     :avatarUrl="base.userImg"></sg-topic-Line>
      </Col>
    </Row>
    <Row type="flex" justify="center">
      <Col :span="24" class="pager-center">
      <Page class="inline-block" :current.sync="page" :total="total" size="small" show-elevator
            :page-size="size"></Page>
      </Col>
    </Row>
    </Col>
    <Col :span="7" :offset="1">
    <Row class="topic-hot">
      <Col :span="24">
      <h3>Topic Hot</h3>
      </Col>
      <Col :span="24" class="topic-hot-line" v-for="hot in hots" :key="hot.url">
      <Tag color="blue">
        <router-link tag="a" :to="'/a/' + hot.abbr">{{hot.name}}</router-link>
      </Tag>
      <router-link tag="a" :to="'/t/' + hot.url">{{hot.title}}</router-link>
      </Col>
    </Row>
    </Col>
  </Row>
  </Col>
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
      console.log('start data')
      const data = {
        size: 20,
        total: 0,
        hots: [],
        page: params.page || '1',
        order: params.order || '1',
        area: params.area || 'all'
      }

      console.log(data)

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
    computed: mapState({
      orders: state => state.order,
      user: state => state.user,
      base: state => state.base
    }),
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
