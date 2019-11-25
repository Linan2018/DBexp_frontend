<template>
    <div id="home">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"style="margin-left:200px">处理中心</el-menu-item>
            <el-menu-item index="2" disabled>消息中心</el-menu-item>
            <el-menu-item index="3" style="float: right;"><i class="el-icon-user-solid" style="margin-right"></i>切换账号</el-menu-item>
        </el-menu>
        <el-container style="height: 600px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(255, 255, 255)">
                <el-menu :default-openeds="['1']">
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

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    
                </el-header>

                <div style="margin: 20px;"></div>
                <!-- <el-form :label-position="left" label-width="80px" :model="formLabelAlign" model="form" class="demo-ruleForm" ref="form"> -->
                <el-row :gutter="20">
                    <el-form :inline="true" :model="form" class="demo-ruleForm" ref="form">

                        <el-col :span="12"><div class="grid-content bg-purple">
                            <el-form-item
                                    label="司机工号"
                                    prop="siji_id"
                            >
                                <el-input type="id" v-model="form.siji_id" autocomplete="off" placeholder="请输入司机工号" clearable></el-input>
                            </el-form-item>

                        </div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple">
                            <el-form-item
                                    label="司机姓名"
                                    prop="siji_xingming"
                            >
                                <el-input v-model="form.siji_xingming" placeholder="请输入司机姓名" clearable></el-input>
                            </el-form-item>

                        </div></el-col>
                    </el-form>
                </el-row>

                <!-- </el-form> -->

                <el-form :inline="true" :model="form" class="demo-ruleForm">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')">查询</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>

                <el-main>
                    <el-table :data="data" :default-sort = "{prop: 'siji_id', order: 'ascending'}">
                        <el-table-column prop="siji_id" label="司机工号" width="160" sortable>
                        </el-table-column>
                        <el-table-column prop="siji_xingming" label="姓名" width="160" sortable>
                        </el-table-column>
                        <el-table-column prop="siji_xingbie" label="性别" width="160" sortable>
                        </el-table-column>
                        <el-table-column prop="xianlu_mingcheng" label="所属线路" width="160" sortable>
                        </el-table-column>
<!--                         <el-table-column prop="chedui_id" label="所属车队" width="160" sortable>
                        </el-table-column> -->
                    </el-table>
                </el-main>
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
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }
            return {
                activeIndex: '1',
                activeIndex2: '1',
                tableData: Array(20).fill(item),
                data:[],
                co:null,
                form: {
                    siji_id: '',
                    siji_xingming: ''
                },
                labelPosition: 'right'
            }

        },
        methods:{
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
                var this_ = this;
                this.axios.post('/api/query_td/',
                    this.form)
                    .then(function(response){
                        this_.data = response.data;
                        if (this_.data != null){
                            this_.open2(Object.keys(this_.data).length);
                        }
                        else{
                            this_.data = [];
                            this_.open1();
                        }
                      })
                    .catch(function(error){
                        console.log(error);
                      })
            },
            resetForm() {
                // alert("!!!")
                this.$refs['form'].resetFields();
                // this.$refs.in1 = '';
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    var errorflag = 0
                    if (!/^\d+$/.test(this.form.siji_id) && this.form.siji_id) {
                        this.open4('司机工号必须为纯数字');
                        errorflag = 1;
                    }
                    if (errorflag){
                        return false;
                    }
                    else {
                        this.post(this.form);
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
