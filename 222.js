function formatDate(dt,f){ 
 if( field(dt)==null) return "insert start date"
 return moment(field(dt)).format(f==null ?"D.M.YY" :f)
}
