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

            <el-container style="border: 500px">
                <el-header style="text-align: right; font-size: 12px">

                </el-header>
                <el-main>
                    <div style="margin: 20px;"></div>



                    <el-col :span="12"><div>
                        <div>
                            <div style="width:500px;height:500px" ref="chart"></div>
                        </div>
                    </div></el-col>

                    <el-col :span="12"><div>




                        <el-row>
                            <el-col :span="3"><div><el-form-item></el-form-item></div></el-col>

                            <el-form :inline="false" :model="form" class="demo-ruleForm" ref="form" label-position='right'>


                                <el-form-item
                                        label="车队编号"
                                        prop="chedui_id"
                                        :rules="
                                        [{ required: true, message: '车队编号不能为空'},
                                        { type: 'number', message: '车队编号必须为数字'}]
                                        "
                                >
                                    <el-input type="id" v-model.number="form.chedui_id" autocomplete="off" placeholder="请输入车队编号" style="width:50%" clearable></el-input>
                                </el-form-item>
                                <el-form :inline="true" :model="form" class="demo-ruleForm">
                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('form')">查询</el-button>
                                        <el-button @click="resetForm">重置</el-button>
                                    </el-form-item>
                                </el-form>

                            </el-form>



                        </el-row>

                        <el-main>
                            <el-row>
                                <el-table :data="data" :default-sort = "{prop: 'shijian', order: 'ascending'}" >
                                    <el-table-column prop="shijian" label="时间" width="200" sortable>
                                    </el-table-column>
                                    <el-table-column prop="zhandian" label="站点" width="120" sortable>
                                    </el-table-column>
                                    <el-table-column prop="weizhang" label="违章" width="120" sortable>
                                    </el-table-column>

                                    <!--                         <el-table-column prop="chedui_id" label="所属车队" width="160" sortable>
                                                            </el-table-column> -->
                                </el-table>
                            </el-row>

                        </el-main>

                    </div></el-col>

                </el-main>
                <!--                         <el-col :span="8"><div class="grid-content bg-purple">
                                            <el-form-item
                                                    label="所属车队"
                                                    prop="chedui_id"
                                            >
                                                <el-input v-model="form.chedui_id" placeholder="请输入车队编号" clearable></el-input>
                                            </el-form-item>
                                        </div></el-col> -->






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
    let id = 4;
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
                activeIndex: '1',
                activeIndex2: '1',
                tableData: Array(20).fill(item),
                data:[],
                chedui_e:[],
                label_e:["暂无数据"],
                data_e:[0],
                // label_e:['闯红灯', '超速行驶', '违规停车', '拒载乘客', '未系安全带'],
                // data_e:[10, 52, 200, 334, 390],

                form: {
                    chedui_id: ''
                },
                ts:12,

                labelPosition: 'right',

            }

        },

        watch:{
            ts(val){
                this.gogogo()
            }
        },
        mounted(){

            this.gogogo();
        },
        created() {
            var this_ = this;
            this_.axios.get('/api/query_cdwz_e/')
                                .then(function(response){
                                    // console.log('eeeeeeeeeeeeee');
                                    // console.log(response);
                                    this_.label_e = [];
                                    this_.data_e = [];
                                    // console.log(response.data);

                                    

                                    for(var item in response.data){
                                        // var idx_cd = this_.chedui_e.indexOf(response.data[item]["chedui_id"]);
                                        if (this_.label_e.indexOf(response.data[item]["weizhang"]) == -1){
                                            this_.label_e.push(response.data[item]["weizhang"]);
                                            this_.chedui_e = [];
                                            this_.data_e.push([]);
                                        }

                                        this_.chedui_e.push('车队'+String(response.data[item]["chedui_id"]));
                                        // console.log(this_.chedui_e.indexOf(response.data[item]["chedui_id"]));
                                        this_.data_e[this_.label_e.indexOf(response.data[item]["weizhang"])].push(response.data[item]["count(weizhang)"]);
                                    }
                                    this_.gogogo ();
                                    // console.log('!!!!!!!!!!!!!!');
                                    // console.log(this_.chedui_e);
                                    // console.log(this_.label_e);
                                    // console.log(this_.data_e);
                                })
                                .catch(function(error){
                                    console.log(error);
                                    this_.$message.error("查询失败，请重试。");
                                });
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
            gogogo (){
                var this_ = this;
                let myChart = this.$echarts.init(this.$refs.chart,'light');
                // console.log(this.$refs.chart);
                                            
                var se = [];
                for(var i=0; i<this.label_e.length; i++){
                    se.push({
                            name: String(this.label_e[i]),
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: this.data_e[i]
                        })
                    }
                // 绘制图表
                myChart.setOption({
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: this.label_e
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis:  {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: this.chedui_e
                    },

                    
                    series: se
                });
            },

            post(data){
                // alert("hhhh");
                var this_ = this;
                this.axios.post('/api/query_cdwz/',
                    this.form)
                    .then(function(response){
                        console.log(response);
                        if (response.data == null){
                            this_.gogogo ();
                            this_.$message('该车队没有违章记录。');
                        }
                        else if (response.data.includes("iderror")){

                            this_.gogogo ();
                            this_.$message.error("该司机工号不存在，请重试。");
                        }
                        else{

                            this_.data = response.data;
                            // console.log(this_.data)
                            this_.$message({
                                message: '已查询到' + String(Object.keys(this_.data).length) + '条违章记录',
                                type: 'success'
                            });
                        }



                    })
                    .catch(function(error){
                        console.log(error)
                        this_.$message.error("查询失败，请重试。");
                    });

            },
            resetForm() {
                // alert("!!!")
                this.$refs['form'].resetFields();
                // this.$refs.in1 = '';
            },
            submitForm(formName) {
                var this_ = this;
                // alert('11!');
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this_.post(this_.form);
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
