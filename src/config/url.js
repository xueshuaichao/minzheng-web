const URL = {
    development: {
        API: 'http://modular-gateway.testing1.svc.k8s.bjo.wdcloud.cc',
    },

    production: {
        API: 'http://modular-gateway.testing1.svc.k8s.bjo.wdcloud.cc',
    },
};

export default URL[process.env.NODE_ENV];
