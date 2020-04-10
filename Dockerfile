### 基础镜像
FROM registry-vpc.cn-hangzhou.aliyuncs.com/eigenlab/frontend-base

### source
COPY . /root/advertorial

WORKDIR /root/advertorial
RUN npm i nrm -g
RUN nrm use taobao
RUN npm i
RUN npm run build
RUN cp -rfp prod/* /root/web/
