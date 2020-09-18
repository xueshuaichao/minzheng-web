<template>
    <!-- <Modal
        v-model="show"
        width="800"
        footer-hide
        title="视频播放"
        @on-visible-change="handleVisibleChange"
    > -->
    <div
        id="J_prismPlayer"
        class="prism-player"
    />
    <!-- </Modal> -->
</template>

<script>
/* eslint-disable */

export default {
    name: "Index",
    props: {
        value: {
            type: [String],
            default: ""
        }
    },

    data() {
        return {
            show: false
        };
    },

    methods: {
        initPlayer(source) {
            // const { value: source } = this;
            const player = new Aliplayer(
                {
                    id: "J_prismPlayer",
                    source,
                    autoplay: false,
                    width: "100%",
                    height: "700px",
                    skinLayout: [
                        {
                            name: "bigPlayButton",
                            align: "cc",
                            x: 0,
                            y: 0
                        },
                        {
                            name: "controlBar",
                            align: "blabs",
                            x: 0,
                            y: 0,
                            children: [
                                {
                                    name: "progress",
                                    align: "blabs",
                                    x: 0,
                                    y: 44
                                },
                                {
                                    name: "playButton",
                                    align: "tl",
                                    x: 15,
                                    y: 12
                                },
                                {
                                    name: "timeDisplay",
                                    align: "tl",
                                    x: 10,
                                    y: 7
                                },
                                {
                                    name: "fullScreenButton",
                                    align: "tr",
                                    x: 10,
                                    y: 12
                                },
                                {
                                    name: "volume",
                                    align: "tr",
                                    x: 5,
                                    y: 10
                                }
                            ]
                        }
                    ]
                },
                player => {
                    console.log("播放器创建了", player);
                }
            );
            this.player = player;
        },

        handleShow(source) {
            this.show = true;
            this.initPlayer(source);
        },

        handleVisibleChange(value) {
            if (!value) {
                this.player.dispose();
            }
        }
    }
};
</script>

<style scoped></style>
