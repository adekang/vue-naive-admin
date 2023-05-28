import 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    title?: string; // 先仅扩展一个title后续再补充
    id?: number;
    pid?: number;
    icon?: string;
    target?: '_blank' | '_self' | '_top' | '_parent';
    keepAlive?:boolean
  }
}
