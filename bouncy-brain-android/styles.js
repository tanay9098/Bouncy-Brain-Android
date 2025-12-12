import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  item: { flexDirection:'row', paddingVertical:12, borderBottomWidth:1, borderColor:'#eee' },
  title: { fontWeight:'700' },
  meta: { color:'#6b7280', fontSize:12 },
  actions: { justifyContent:'center' },
  btn: { backgroundColor:'#8fe6c9', padding:8, borderRadius:8 },
  btnSecondary: { borderWidth:1, borderColor:'#e6eef5', padding:8, borderRadius:8, marginTop:8 }
});
