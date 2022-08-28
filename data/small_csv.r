setwd("C:/Users/shahe/project/hawk_eye/data")
init_df<-read.csv("brent_final.csv", header=TRUE, stringsAsFactors=FALSE)
small_df<-init_df[, !(colnames(init_df) %in% c("Time", "RollSpeed", "PitchSpeed", "YawSpeed", "rcin0", "rcin1", "rcin2", "rcin3", "rcin4", "rcin5", "rcin6", "rcin7", "rcin8", "rcin9", "rcin10", "rcin11", "rcin12", "rcin13", "rcin14", "rcin15", "control0", "control1", "control2", "control3"))]
small_df$alt_corrected<- small_df[, 4] + 13;
write.csv(small_df, "new_small_data.csv")