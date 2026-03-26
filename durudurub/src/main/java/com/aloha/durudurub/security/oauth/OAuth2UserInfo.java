package com.aloha.durudurub.security.oauth;

import java.util.Map;

// 공통 메서드 정의
public interface OAuth2UserInfo {
    
    String getProvider();  
    String getProviderId();     
    String getEmail();
    String getUserName();
    
    Map<String, Object> getAttributes();

}
