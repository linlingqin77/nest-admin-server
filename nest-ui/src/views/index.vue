<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>Nest-Ruoyi-Admin</h2>
        <p>
          Nest-Ruoyi-Admin 前端基于开源若依模板 后端使用nestjs构建的快速开发框架
          <br />
        </p>
        <p>
          <b>当前版本:</b> <span>v{{ version }}</span>
        </p>
        <p>
          <el-tag type="danger">&yen;免费开源</el-tag>
        </p>
        <p>
          <el-button type="primary" size="mini" icon="el-icon-cloudy" plain
            @click="goTarget('https://github.com/linlingqin77/Nest-Ruoyi-Admin.git')">访问github</el-button>
          <el-button type="primary" size="mini" icon="el-icon-cloudy" plain
            @click="goTarget('https://gitee.com/linlingqin/Nest-Ruoyi-Admin.git')">访问gitee</el-button>
          <el-button size="mini" icon="el-icon-s-home" plain
            @click="goTarget('http://linlingqin.top:3000/admin')">访问主页</el-button>
        </p>
      </el-col>

      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="12">
            <h2>技术选型</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h4>后端技术</h4>
            <ul>
              <li>Nestjs</li>
              <li>Node</li>
              <li>JWT</li>
              <li>TypeOrm</li>
              <li>Redis</li>
              <li>Mysql</li>
              <li>...</li>
            </ul>
          </el-col>
          <el-col :span="6">
            <h4>前端技术</h4>
            <ul>
              <li>Vue</li>
              <li>Vuex</li>
              <li>Element-ui</li>
              <li>Axios</li>
              <li>Sass</li>
              <li>Quill</li>
              <li>...</li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>更新日志</span>
          </div>
          <el-collapse accordion>
            <el-collapse-item title="v0.0.1 - 2024-06-27">
              <ol>
                <li>测试版发布</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v0.0.2 - 2024-06-28">
              <ol>
                <li>修复部门数权限bug</li>
              </ol>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>联系信息</span>
          </div>
          <div class="body">
            <!-- <p>
              <i class="el-icon-s-promotion"></i> 官网：<el-link href="http://www.ruoyi.vip"
                target="_blank">http://www.ruoyi.vip</el-link>
            </p> -->

            <p>
              <i class="el-icon-chat-dot-round"></i> 微信：<a href="javascript:;">llq1359533212</a>
            </p>
            <p>
              <i class="el-icon-chat-dot-round"></i> QQ：<a href="javascript:;">1359533212</a>
            </p>
            <p>
              <i class="el-icon-money"></i> 支付宝：<a href="javascript:;" class="支付宝信息">18396116202</a>
            </p>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>捐赠支持</span>
          </div>
          <div class="body">
            <img src="@/assets/images/wx-pay.jpg" alt="donate" width="200px" />
            <img src="@/assets/images/zfb-pay.jpg" alt="donate" width="200px" />
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: "0.0.1"
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans",
  "Helvetica Neue",
  Helvetica,
  Arial,
  sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>
