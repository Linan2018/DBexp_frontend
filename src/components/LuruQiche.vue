<template>
    <div id="home">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"style="margin-left:200px">处理中心</el-menu-item>
            <el-menu-item index="2" disabled>消息中心</el-menu-item>
            <el-menu-item index="3" style="float: right;"><i class="el-icon-user-solid" style="margin-right"></i>切换账号</el-menu-item>
        </el-menu>
        <el-container style="height: 600px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(255, 255, 255)">
                <el-menu :default-openeds="['2']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-search"></i>查询</template>
                        <el-menu-item-group>
                            <template slot="title">司机基本信息</template>
                            <router-link to="/fwcx"><el-menu-item index="1-1">范围查询</el-menu-item></router-link>
                            <router-link to="/tdcx"><el-menu-item index="1-2">特定查询</el-menu-item></router-link>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">违章</template>
                            <router-link to="/sjwz"><el-menu-item index="2-1">司机违章信息</el-menu-item></router-link>
                            <router-link to="/cdwz"><el-menu-item index="2-2">车队违章信息</el-menu-item></router-link>
                        </el-menu-item-group>

                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-edit-outline"></i>录入</template>
                        <el-menu-item-group>
                            <template slot="title">司机</template>
                            <router-link to="/lrsj"><el-menu-item index="3-1">司机基本信息</el-menu-item></router-link>
                            <router-link to="/lrwz"><el-menu-item index="3-2">司机违章信息</el-menu-item></router-link>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">汽车</template>
                            <router-link to="/lrqc"><el-menu-item index="4-1">汽车基本信息</el-menu-item></router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3" disabled>
                        <template slot="title"><i class="el-icon-setting"></i>未开发</template>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container style="border: 500px">
                <el-header style="text-align: right; font-size: 12px">

                </el-header>
                <el-main>
                    <div style="margin: 20px;"></div>
                    <!-- <el-form :label-position="left" label-width="80px" :model="formLabelAlign" model="form" class="demo-ruleForm" ref="form"> -->
                    <!-- <el-container> -->


                    <el-row>
                        <el-container>
                            <el-col :span="6"><div><el-form-item></el-form-item></div></el-col>
                            <el-col :span="9"><div>
                                <el-form ref="form" :model="form" class="demo-ruleForm" label-width="80px" :rules="rules">
                                    <el-form-item label="车牌号" prop="chepaihao">
                                        <el-input v-model="form.chepaihao"  placeholder="请输入车牌号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="座数" prop="zuoshu">
                                        <el-input v-model.number="form.zuoshu" placeholder="请输入座数"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属线路" prop="xianlu_mingcheng">
                                        <el-cascader :props="props" v-model="form.xianlu_mingcheng" style="width:100%;" placeholder="请输入所属线路"
                                        :rules="
                                        [{ required: true, message: '所属线路不能为空'}]
                                        "
                                        ></el-cascader>
                                    </el-form-item>
                                </el-form>
                                <el-form :model="form" class="demo-ruleForm">
                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('form')">录入</el-button>
                                        <el-button @click="resetForm">重置</el-button>
                                    </el-form-item>
                                </el-form>

                            </div></el-col>
                            <el-col :span="8"><div></div></el-col>

                        </el-container>
                    </el-row>



                </el-main>
            </el-container>
        </el-container>
        </el-container>
    </div>
</template>
<style>
    .el-header {
        background-color: #FFFFFF;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
    a {
        text-decoration: none;
    }
    a:active{
        color:none; /*这是鼠标点击后*/
    }
    .router-link-active {
        text-decoration: none;
        color:none;
    }
</style>


<script>

    export default {
        name: 'home',
        components: {
        },
        data () {
            var this_ = this;
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }
            return {
                props: {
                  lazy: true,
                  lazyLoad (node, resolve) {
                    var { level } = node;
                    setTimeout(() => {
                      this_.axios.get('/api/insert_sj/xianlu/')
                          .then(function(response){
                              // console.log('start...f1_____axios');
                              var p = new Promise(function(resolve, reject){
                                  // console.log('response.data');
                                  // console.log(response.data);
                                  resolve(response.data);
                              })
                              return p;
                          }).then(function(data){
                              // console.log('start...f');
                              // console.log('in if1');
                              // console.log(data);
                              resolve(data);
                          }).catch(function(error){
                              console.log(error)
                              this_.$message.error("查询线路失败，请重试。");
                          });

                      // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                      
                      
                    }, 0);
                  }
                },
                activeIndex: '1',
                activeIndex2: '1',
                tableData: Array(20).fill(item),
                data:null,
                co:null,
                form: {
                    chepaihao: '',
                    zuoshu:'',
                    xianlu_mingcheng:''
                },

                labelPosition: 'right',
                rules: {
                    chepaihao: [
                        { required: true, message: '车牌号不能为空'}
                    ],
                    zuoshu: [
                        { required: true, message: '座数不能为空'},
                        { type: 'number', message: '座数必须为数字'}
                    ],
                    xianlu_mingcheng: [
                        { required: true, message: '所属线路不能为空'}
                    ]
                }
            }

        },
        methods:{
            onSubmit() {
                console.log('submit!');
            },
            open1() {
                this.$message('没有查询到任何记录');
            },

            open2(len) {
                this.$message({
                    message: '已查询到' + String(len) + '条记录',
                    type: 'success'
                });
            },
            open4(msg) {
                this.$message.error(msg);
            },

            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            post(data){
                // alert("hhhh");
                var this_ = this;
                // console.log(this.form)
                // this.form.shijian = this.form.shijian1.slice(0, 10) + '-' + this_.form.shijian2.slice(11,-5)
                this.axios.post('/api/insert_qc/',
                    this.form)
                    .then(function(response){
                        console.log(response);
                        if (response.data.includes("cpherror")){
                            this_.$message.error("该车牌号已存在，请重试。");
                        }
                        else{
                            this_.$message({
                                message: '成功录入信息！',
                                type: 'success'
                            });
                        }
                    })
                    .catch(function(error){
                        console.log(error)
                        this_.$message.error("录入失败，请重试。");
                    })
            },
            resetForm() {
                // alert("!!!")
                this.$refs['form'].resetFields();
                this.form.xianlu_mingcheng='';
                // this.$refs.in1 = '';
            },
            submitForm(formName) {
                var this_ = this;
                // alert('11!');
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('录入一条汽车信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            // alert("!!!");
                            this_.post(this_.form);
                            // alert("!!!2");
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消录入'
                            });
                        });
                    }
                    else {
                        this_.open4("表单含有非法信息，请检查。");
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
</style>
