"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[958],{2444:function(e,t,n){n.d(t,{ZP:function(){return q}});var i=n(41085),r=n(97501),a=n(63801),o=n(13735),s=n.n(o),u=n(97435),d=n.n(u),c=n(49360),p=n(3373),l=n(91357),f=n(53654),m=n(94118),_=n(62957),g=n(27691),I=n(98324),E=n(7695),y=n(70764),A=n.n(y),h=n(89238),O=n.n(h);function R(e,t){let n=`payload-included(${!!e})`;if(e?.length&&(n=`${n},event-payload(${e})`),!A()(t)){let e=O()(t,(e,t)=>`${t}(${e})`).join(",");n=`${n},${e}`}return n}class T{constructor(e){this.logger=e}error(e,t,...n){let{message:i="",error_category:r}=e,a=e.level||(0,g.Mc)(r);this.logger.error({...e,level:a},t||i,...n)}warn(e,t,...n){let{message:i="",error_category:r}=e,a=e.level||(0,g.Mc)(r);this.logger.warn({...e,level:a},t||i,...n)}info(e,t,...n){let{message:i=""}=e;this.logger.info(e,t||i,...n)}debug(e,t,...n){this.logger.debug(e,t,...n)}trace(e,t,...n){let{message:i}=e;this.logger.trace(e,t||i,...n)}event(e,t){let{eventPayload:n="",additionalInfo:i={},...r}=t||{},a=R(n,i);this.info({...r,action_name:e,info:a})}errorEvent(e){let{eventPayload:t="",additionalInfo:n={},...i}=e,r=R(t,n);this.error({...i,error_category:e.error_category||"UNKNOWN_ERROR",error_codes:e.error_codes||"",action_name:"event:error",info:r})}child(e,t){return new T(this.logger.child(e,t))}}var N=n(40257);let{NODE_ENV:C,APP_NAME:S,LOG_LEVEL:D}=N.env,{GC_CLIENT:L,LOGGING_URL:v}=(0,f.Z)();async function P(e){let t=await fetch(e,{headers:{accept:"application/json"},credentials:"include"});return"cors"===t.type?null:t.json()}function U(e){let t=(0,E.NN)()||(0,E.V6)()||(0,E._K)()||{};if(t.identityOptions?.debugDisabled)return;let{level:n,time:i,pid:r,hostname:o,service:u,event:c,msg:p,name:l,...f}=e,m=new Date(i).toISOString().split("T")[1],_=d().levels.labels[n].toUpperCase(),g=l?`${l}/`:"",I=g||r?` (${g}${r}):`:"",y="";if(f&&Object.keys(f).length&&(y=f),f&&f?.type?.includes("Error")){let e=Error(f.type);e.stack=f.stack,y=e}let A="INFO"===_?a.ZP.green(_):a.ZP.yellow(_);A="ERROR"===_?a.ZP.red(_):A;let h=[`[${m}] ${A}${I}`,u,c,p,y].filter(Boolean);"ERROR"===_?console.error(Error(s()(y,"info")||p)):(console.log(...h),document.cookie.includes("showCallStack=")&&console.log(Error(`Callstack associated with ${_} log above: (not an actual error)'`)))}let b=new i.EventEmitter;b.addListener("data",function(e){var t;if(U(e),30>Number(e.level)||!v)return;let n=new URL(v);e.action&&Object.assign(e,{action:(t=e.action,`${t}`.replace(/\W/g," ").trim().replace(/\s+/g,"_").toLocaleLowerCase())}),Object.entries(e).forEach(([e,t])=>t&&n.searchParams.append(e,t)),n.searchParams.delete("0"),n.searchParams.delete("time"),n.searchParams.append("device_time",e.time),n.searchParams.append("timestamp",e.time),function(e){let t=window.SiteConfig?.oidcClassificationCode||"";t&&e.searchParams.append("oidc_classification_code",t),e.searchParams.append("source",(0,p.jA)()?"identity sdk v5":"FIRST_PARTY"===t?"auth ui 1st party":"auth ui 3rd party"),Object.entries(function(){let{platform:e="",sdkInstallId:t="",sdkVersion:n="",sdkSwid:i="",identityOptions:r}=(0,E.NN)()||(0,E.V6)()||(0,E._K)()||{},a=(0,E.o_)(),o=E.Ju()?.deviceId||"",s=(0,l.xG)();return{conversation_id:a,device_id:o,platform:e,sdk_install_id:t,sdk_version:n,bu_name:r?.reportingValues?.reportingSource||"",client_context:r?.reportingValues?.reportingContext||"",...i?{swid:i}:{},...s?{rum_session_id:s}:{}}}()).forEach(([t,n])=>{(!e.searchParams.has(t)||n?.length)&&e.searchParams.set(t,n)});try{let t=JSON.parse(sessionStorage.getItem(I.Yx)||"{}"),n=t?.swid||t?.sub||"";n?.length&&e.searchParams.set("swid",n)}catch(e){console.error(e)}}(n),e?.code&&!n.searchParams.has(g.dh)&&n.searchParams.append(g.dh,e.code),e?.category&&!n.searchParams.has(g.Yb)&&n.searchParams.append(g.Yb,e.category),e?.status&&!n.searchParams.has(g.$Y)&&n.searchParams.append(g.$Y,e.status),e?.stackTrace&&n.searchParams.set("stackTrace",`${e.stackTrace}`.trim().substring(0,500)),e?.stack&&n.searchParams.set("stack",`${e.stack}`.trim().substring(0,500)),P(`${n}`).catch(console.error)});let w=new r.Writable({async write(e,t,n){try{let t=JSON.parse(e.toString()||"");"development"===C&&U(t)}catch(e){}n()}}),k="relay";var q=new T(d()({browser:{asObject:!0,serialize:!0,write:e=>b.emit("data",e)},name:S,level:D||"debug"},w).child(function(){let e="1.0.830",t={appid:"IDENTITY-SDK-V5",lightbox_version:e,sdk_version:`web v5 ${e}`,platform:"web",git_sha:N.env.GIT_SHA||"96f129e6d136ae4c1df3beeeeeb1755d6fe23767"};{let{language:e,countryCode:n,clientId:i,view:r}=function(e){let t=e.slice(1).split("/");if(t[0]===k){let[,e,...n]=t;return{language:"",countryCode:"",clientId:e,view:[k,...n].join("/")}}let[n,i,r,...a]=t;return{language:n,countryCode:i,clientId:r,view:a.join("/")}}(window.location.pathname),a="STAGE"===L?"QA":L;Object.assign(t,{install_id:function(){let e=(0,m.V)().getItem(_.QU);if(e)return e;let t=(0,c.Z)();return(0,m.V)().setItem(_.QU,t),t}(),environment:a?.toLowerCase(),client_id:`${i}-${a}`,country_code:n?.toLowerCase(),language:e?.toLowerCase(),view:r})}return t}()))},77011:function(e,t,n){var i,r,a,o,s,u;n.d(t,{$6:function(){return G},A:function(){return v},BJ:function(){return $},D3:function(){return R},E5:function(){return L},GX:function(){return x},HO:function(){return p},Io:function(){return a},Jr:function(){return Y},K4:function(){return H},LN:function(){return g},Lq:function(){return S},Ly:function(){return U},N_:function(){return V},P8:function(){return I},PE:function(){return c},Q0:function(){return E},QF:function(){return A},TF:function(){return T},Tg:function(){return k},U6:function(){return C},UW:function(){return r},Ul:function(){return P},WD:function(){return K},Wp:function(){return B},Ws:function(){return h},bL:function(){return M},c3:function(){return F},cS:function(){return W},j0:function(){return b},qH:function(){return N},rJ:function(){return O},u6:function(){return q},uk:function(){return m},up:function(){return l},v$:function(){return w},wY:function(){return D},yL:function(){return f},yV:function(){return y},zF:function(){return _}});let d=(0,n(53654).Z)(),c=d.ORCHESTRATION_BASE||"https://login-qa.disney.com",p=d.ORCHESTRATION_ADAPTER_URL??"/orchestration-adapter",l=d.ONEID_BASE||"https://qa.cdn.registerdisney.go.com";l.replace("cdn.","");let f=d.GC_CLIENT||"QA",m="RECOVERY",_="REGISTER",g="EMAIL_VERIFICATION",I="MOBILE_VERIFICATION",E="UPDATE_CREDENTIALS",y=[m,_,g,I,E],A=[g,E];(o=i||(i={})).RECOVERY="RECOVERY",o.EMAIL_VERIFICATION="EMAIL_VERIFICATION",o.MOBILE_VERIFICATION="MOBILE_VERIFICATION",o.UPDATE_CREDENTIALS="UPDATE_CREDENTIALS",(s=r||(r={})).LOGIN="LOGIN",s.LOGGED_IN="LOGGED_IN",s.REGISTER="REGISTER",(u=a||(a={})).COLLECT_PHONE="COLLECT_PHONE",u.EDIT_PHONE="EDIT_PHONE",u.VERIFY_PHONE="VERIFY_PHONE";let h="EMAIL",O="PHONE",R="PHONE_VERIFICATION",T="RECAPTCHA",N="ACCOUNT_RECOVERY",C="INVALID_NETWORK",S="X-Datadog-Trace-Id",D="X-Disney-Identity-Client-Id",L="X-Disney-Identity-Orchestration-Debug",v="X-Disney-Identity-Device-Token",P="X-Disney-Identity-Language-Preference",U="Device-ID",b="X-Disney-Identity-Email-Validation-Support",w="X-Disney-Identity-Passwordless-Support",k="x-dss-client-api-key",q="X-Disney-Identity-Security-Challenge",V="PPU_ACTIONABLE_INPUT",G="PROFILE_EXISTS",$="PPU_LEGAL",M="PPU_MARKETING",x="IDENTITY_PENDING_DELETE",F="DEVICE_LINK_INVALID_OTP_CODE",H="INVALID_OTP_CODE",B="DEVICE_LINK_LOCKOUT_REACHED",Y="OTP_THROTTLED",W="INUSE_VALUE",K="INVALID_VALUE"},46155:function(e,t,n){function i({request:e,redeem:t}){return{request:e,redeem:t}}n.d(t,{x:function(){return r}});let r={UNAUTH_EMAIL_VERIFICATION_LOGIN:i({request:{mutation:"requestUnauthenticatedOtp",fixedVariables:{reason:"LOGIN"},actionName:"service:otprequest:unauth:login"},redeem:{mutation:"redeemUnauthenticatedOtp",fixedVariables:{reason:"LOGIN"},actionName:"service:otpredeem:unauth:login"}}),UNAUTH_EMAIL_VERIFICATION_FORGOT_PASSWORD:i({request:{mutation:"requestUnauthenticatedOtp",fixedVariables:{reason:"FORGOT_PASSWORD"},actionName:"service:otprequest:unauth:forgot-password"},redeem:{mutation:"redeemUnauthenticatedOtp",fixedVariables:{reason:"FORGOT_PASSWORD"},actionName:"service:otpredeem:unauth:forgot-password"}}),AUTH_EMAIL_VERIFICATION_CHANGE_EMAIL:i({request:{mutation:"requestAuthenticatedOtp",fixedVariables:{reason:"CHANGE_EMAIL"},actionName:"service:otprequest:auth:change:email"},redeem:{mutation:"redeemAuthenticatedOtp",fixedVariables:{reason:"CHANGE_EMAIL"},actionName:"service:otpredeem:auth:change:email"}}),AUTH_EMAIL_VERIFICATION_CHANGE_PASSWORD:i({request:{mutation:"requestAuthenticatedOtp",fixedVariables:{reason:"CHANGE_PASSWORD"},actionName:"service:otprequest:auth:change:password"},redeem:{mutation:"redeemAuthenticatedOtp",fixedVariables:{reason:"CHANGE_PASSWORD"},actionName:"service:otpredeem:auth:change:password"}}),AUTH_EMAIL_VERIFICATION_VERIFY_EMAIL:i({request:{mutation:"requestAuthenticatedOtp",fixedVariables:{reason:"VERIFY_EMAIL"},actionName:"service:otprequest:auth:verify:email"},redeem:{mutation:"redeemAuthenticatedOtp",fixedVariables:{reason:"VERIFY_EMAIL"},actionName:"service:otpredeem:auth:verify:email"}}),AUTH_EMAIL_VERIFICATION_STEP_UP_AUTH:i({request:{mutation:"requestAuthenticatedOtp",fixedVariables:{reason:"STEP_UP_AUTH"},actionName:"service:otprequest:auth:step-up"},redeem:{mutation:"redeemAuthenticatedOtp",fixedVariables:{reason:"STEP_UP_AUTH"},actionName:"service:otpredeem:auth:step-up"}}),UNAUTH_EMAIL_VERIFICATION_RECLAIM:i({request:{mutation:"requestUnauthenticatedOtp",fixedVariables:{reason:"CANCEL_IDENTITY_DELETION"},actionName:"service:otprequest:unauth:reclaim"},redeem:{mutation:"redeemUnauthenticatedOtp",fixedVariables:{reason:"CANCEL_IDENTITY_DELETION"},actionName:"service:otpredeem:unauth:reclaim"}}),MOBILE_VERIFICATION:i({request:{mutation:"requestSmsOtpForVerifyMobile",actionName:"service:otprequest:sms:verify:mobile"},redeem:{mutation:"redeemSmsOtpForVerifyMobile",actionName:"service:otpredeem:sms:verify:mobile"}})}},3986:function(e,t,n){n.d(t,{k:function(){return r},y:function(){return o}});var i=n(32385);let r=["VERIFY_EMAIL","STEP_UP_AUTH","CHANGE_EMAIL","CHANGE_PASSWORD"];function a(e){return{...e,getVariables:e.getVariables??(e=>({input:e}))}}let o={requestUnauthenticatedOtp:a({query:i.vi,type:"request",variablesCategory:{alias:"derived",deliveryMethod:"derived",reason:"fixed"}}),redeemUnauthenticatedOtp:a({query:i.C3,type:"redeem",variablesCategory:{alias:"derived",passcode:"derived",deliveryMethod:"derived",reason:"fixed"}}),requestAuthenticatedOtp:a({query:i.Sp,type:"request",variablesCategory:{deliveryMethod:"derived",reason:"fixed"}}),redeemAuthenticatedOtp:a({query:i.Ko,type:"redeem",variablesCategory:{deliveryMethod:"derived",passcode:"derived",reason:"fixed"}}),requestSmsOtpForVerifyMobile:a({query:i.MR,type:"request",variablesCategory:{mobileWithCountryCode:"dynamic",context:"dynamic"}}),redeemSmsOtpForVerifyMobile:a({query:i.nO,type:"redeem",variablesCategory:{mobileWithCountryCode:"dynamic",passcode:"derived"}})}},32385:function(e,t,n){n.d(t,{$3:function(){return K},Bd:function(){return w},C3:function(){return T},CB:function(){return O},Cg:function(){return k},Ch:function(){return u},Fy:function(){return h},GB:function(){return y},HM:function(){return c},I:function(){return f},Jd:function(){return v},Jz:function(){return G},Ko:function(){return S},Kt:function(){return V},M4:function(){return _},MR:function(){return p},Sp:function(){return N},Su:function(){return A},T$:function(){return m},T0:function(){return I},Vb:function(){return E},Vx:function(){return o},Wq:function(){return W},ZD:function(){return $},d4:function(){return H},fg:function(){return F},gJ:function(){return j},gQ:function(){return L},gf:function(){return C},hv:function(){return g},hz:function(){return q},jK:function(){return U},kZ:function(){return s},nO:function(){return l},qp:function(){return J},qq:function(){return b},s:function(){return d},s6:function(){return Y},sv:function(){return B},tj:function(){return D},uF:function(){return x},vi:function(){return R},wc:function(){return P},wn:function(){return M},wt:function(){return a},x4:function(){return i},z2:function(){return r}});let i=`mutation login($input: LoginInput!) {
  login(input: $input) {
    user {
      keys {
        identityId
        swid
      }
      identity {
        id
        swid
        email
        username
      }
      oneIDGuest {
        profile {
          swid
          username
          countryCodeDetected
          region
          ageBand
          emailVerified
          firstName
        }
        displayName {
          namespace
          displayName
          proposedDisplayName
          proposedStatus
          moderationStatusDate
        }
        marketing {
          code
          subscribed
          textID
        }
        entitlements {
          digitalAssetName
          digitalAssetSourceName
          productId
          assetId
          effectiveDate
          expirationDate
          policyType
        }
        s2
        etag
        payload
      }
      assignments {
        featureId
        variantId
        version
        type
      }
    }
    tokens {
      idToken
    }
    oneIDToken {
      access_token
      refresh_token
      swid
      ttl
      refresh_ttl
      scope
      sso
      id_token
      authenticator
      loginValue
      high_trust_expires_in
      initial_grant_in_chain_time
      client_id
      sessionTransferKey
      exp
      iat
      refresh_exp
      high_trust_exp
    }
  }
}`,r=`mutation register($input: RegisterInput!) {
  register(input: $input) {
    user {
      keys {
        identityId
        swid
      }
      account {
        id
        profiles {
          id
          name
          languagePreferences {
            subtitleAppearance {
              backgroundColor
              size
              description
              edgeStyle
              backgroundOpacity
              windowColor
              textColor
              fontOpacity
              font
              windowOpacity
            }
            subtitleLanguage
            preferSDH
            subtitlesEnabled
            playbackLanguage
            preferAudioDescription
            appLanguage
          }
        }
        defaultProfile
      }
      identity {
        id
        swid
        email
        username
      }
      oneIDGuest {
        profile {
          swid
          referenceId
          testProfileFlag
          username
          prefix
          firstName
          middleName
          lastName
          suffix
          languagePreference
          region
          email
          parentEmail
          dateOfBirth
          gender
          ageBand
          ageBandAssumed
          countryCodeDetected
          emailVerified
          parentEmailVerified
          registrationDate
          dateLastModified
          linkedAccountsAvailable
          status
          addresses {
            addressGuid
            type
            line1
            line2
            line3
            city
            stateProvince
            postalCode
            country
            preferred
            dateCreated
            dateLastModified
          }
          phones {
            phoneGuid
            type
            number
            internationalPrefix
            extension
            preferred
            dateCreated
            dateLastModified
            countryCode
            verified
          }
          pronunciationName
        }
        linkedAccounts {
          swid
          isNRT
          isPrimaryDID
          username
          email
          parentEmail
          dateRegistered
          dateLastLogin
          registeredAffiliate
          loginDomains
          status
        }
        displayName {
          namespace
          displayName
          proposedDisplayName
          proposedStatus
          moderationStatusDate
        }
        geolocation {
          ip
          continentAlpha2
          countryAlpha2
          regionAlpha2
          latitude
          longitude
          usedFallback
        }
        marketing {
          code
          subscribed
          textID
        }
        entitlements {
          digitalAssetName
          digitalAssetSourceName
          productId
          assetId
          effectiveDate
          expirationDate
          policyType
        }
        activities {
          activities {
            activityCode
            activityList {
              dateRequested
              activityPermissionGuid
              approvalStatus
              swid
            }
          }
        }
        s2
        etag
        payload
      }
      assignments {
        featureId
        variantId
        version
        type
      }
    }
    tokens {
      idToken
    }
    oneIDToken {
      access_token
      refresh_token
      swid
      ttl
      refresh_ttl
      scope
      sso
      id_token
      authenticator
      loginValue
      high_trust_expires_in
      initial_grant_in_chain_time
      client_id
      sessionTransferKey
      exp
      iat
      refresh_exp
      high_trust_exp
    }
  }
}`,a=`
  query CheckAuthorization($input: CheckAuthorizationInput!) {
    checkAuthorization(input: $input) {
      etag
    }
  }
`,o=`
  mutation UpdateUserBySwid($input: UpdateUserBySwidInput!) {
    updateUserBySwid(input: $input) {
      user {
        oneIDGuest {
          profile {
            swid
          }
        }
      }
    }
  }
`,s=`
  mutation UpdateUserBySwid($input: UpdateUserBySwidInput!) {
    updateUserBySwid(input: $input) {
      user {
        oneIDGuest {
          profile {
            swid
            referenceId
            testProfileFlag
            username
            prefix
            firstName
            middleName
            lastName
            suffix
            languagePreference
            region
            email
            parentEmail
            dateOfBirth
            gender
            ageBand
            ageBandAssumed
            countryCodeDetected
            emailVerified
            parentEmailVerified
            registrationDate
            dateLastModified
            linkedAccountsAvailable
            status
            addresses {
              addressGuid
              type
              line1
              line2
              line3
              city
              stateProvince
              postalCode
              country
              preferred
              dateCreated
              dateLastModified
            }
            phones {
              phoneGuid
              type
              number
              internationalPrefix
              extension
              preferred
              dateCreated
              dateLastModified
              countryCode
              verified
            }
            pronunciationName
          }
          linkedAccounts {
            swid
            isNRT
            isPrimaryDID
            username
            email
            parentEmail
            dateRegistered
            dateLastLogin
            registeredAffiliate
            loginDomains
            status
          }
          displayName {
            namespace
            displayName
            proposedDisplayName
            proposedStatus
            moderationStatusDate
          }
          geolocation {
            ip
            continentAlpha2
            countryAlpha2
            regionAlpha2
            latitude
            longitude
            usedFallback
          }
          marketing {
            code
            subscribed
            textID
          }
          entitlements {
            digitalAssetName
            digitalAssetSourceName
            productId
            assetId
            effectiveDate
            expirationDate
            policyType
          }
          activities {
            activities {
              activityCode
              activityList {
                dateRequested
                activityPermissionGuid
                approvalStatus
                swid
              }
            }
          }
          s2
          etag
          payload
        }
      }
    }
  }
`,u=`mutation updateEmailBySwid($input: UpdateEmailBySwidInput!) {
  updateEmailBySwid(input: $input) {
    accepted
  }
}`,d=`mutation updateEmail($input: UpdateEmailInput!) {
  updateEmail(input: $input) {
    accepted
  }
}`,c=`
mutation redeemOtp($input: RedeemOtpInput!) {
  redeemOtp(input: $input) {
    recoveryToken {
      access_token
      swid
      ttl
      scope
      authenticator
      loginValue
      clickbackType
    }
    accountRecoveryProfiles {
      swid
      isNRT
      isPrimaryDID
      username
      firstName
      lastName
      email
      parentEmail
      dateRegistered
      dateLastLogin
      registeredAffiliate
      registeredDomain
      loginDomains
      status
      isDependant
      ageBand
      isUnresolvableMase
      isOwnedByEmailAssociatedWithUsername
      referenceId
    }
  }
}

`,p=`
  mutation requestSmsOtpForVerifyMobile($input: RequestSmsOtpForVerifyMobileInput!) {
    requestSmsOtpForVerifyMobile(input: $input) {
      accepted
    }
  }
`,l=`
  mutation redeemSmsOtpForVerifyMobile($input: RedeemSmsOtpForVerifyMobileInput!) {
    redeemSmsOtpForVerifyMobile(input: $input) {
      accepted
    }
  }
`,f=`
  query RecoveryMethods($input: GetRecoveryMethodsInput!) {
    getRecoveryMethods(input: $input) {
      recoveryMethods {
        mask
        id
        recoveryMethod
      }
    }
  }
`,m=`
  query getDeliveryMethods($input: GetDeliveryMethodsInput!) {
    getDeliveryMethods(input: $input) {
      maskedDeliveryMethods {
        __typename
        ... on MaskedEmailDeliveryMethod {
          type
          maskedValue
          verified
        }
        ... on MaskedMobileNumberDeliveryMethod {
          type
          maskedValue
        }
      }
    }
  }
`,_=`mutation loginWithRecoveryToken($input: LoginWithRecoveryTokenInput!) {
  loginWithRecoveryToken(input: $input) {
    user {
      keys {
        identityId
        swid
      }
      account {
        id
        profiles {
          id
          name
          languagePreferences {
            subtitleAppearance {
              backgroundColor
              size
              description
              edgeStyle
              backgroundOpacity
              windowColor
              textColor
              fontOpacity
              font
              windowOpacity
            }
            subtitleLanguage
            preferSDH
            subtitlesEnabled
            playbackLanguage
            preferAudioDescription
            appLanguage
          }
        }
        defaultProfile
      }
      identity {
        id
        swid
        email
        username
      }
      oneIDGuest {
        profile {
          swid
          referenceId
          testProfileFlag
          username
          prefix
          firstName
          middleName
          lastName
          suffix
          languagePreference
          region
          email
          parentEmail
          dateOfBirth
          gender
          ageBand
          ageBandAssumed
          countryCodeDetected
          emailVerified
          parentEmailVerified
          registrationDate
          dateLastModified
          linkedAccountsAvailable
          status
          addresses {
            addressGuid
            type
            line1
            line2
            line3
            city
            stateProvince
            postalCode
            country
            preferred
            dateCreated
            dateLastModified
          }
          phones {
            phoneGuid
            type
            number
            internationalPrefix
            extension
            preferred
            dateCreated
            dateLastModified
            countryCode
            verified
          }
          pronunciationName
        }
        linkedAccounts {
          swid
          isNRT
          isPrimaryDID
          username
          email
          parentEmail
          dateRegistered
          dateLastLogin
          registeredAffiliate
          loginDomains
          status
        }
        displayName {
          namespace
          displayName
          proposedDisplayName
          proposedStatus
          moderationStatusDate
        }
        geolocation {
          ip
          continentAlpha2
          countryAlpha2
          regionAlpha2
          latitude
          longitude
          usedFallback
        }
        marketing {
          code
          subscribed
          textID
        }
        entitlements {
          digitalAssetName
          digitalAssetSourceName
          productId
          assetId
          effectiveDate
          expirationDate
          policyType
        }
        activities {
          activities {
            activityCode
            activityList {
              dateRequested
              activityPermissionGuid
              approvalStatus
              swid
            }
          }
        }
        s2
        etag
        payload
      }
      assignments {
        featureId
        variantId
        version
        type
      }
    }
    oneIDToken {
      access_token
      refresh_token
      swid
      ttl
      refresh_ttl
      scope
      sso
      id_token
      authenticator
      loginValue
      high_trust_expires_in
      initial_grant_in_chain_time
      client_id
      sessionTransferKey
      exp
      iat
      refresh_exp
      high_trust_exp
    }
  }
}`,g=`
  query checkUserFlow($input: CheckUserFlowInput!) {
  checkUserFlow(input: $input) {
    userFlow
    details {
      __typename
      ... on LoginFlowDetails {
        firstInteractionWithBrand
        passwordReset
        authenticationMethods
        authenticationMethodReasons
        mobilePhoneNumberStatus {
          collectionOptedOut
          exists
          verified
        }
      }
    }
  }
}
`,I=`
  mutation RequestEmailOtpForEmailVerification {
    requestEmailOtpForEmailVerification {
      broadcastId
      expirationTime
      sessionId
    }
  }
`,E=`
  mutation RequestEmailOtpForRecovery($input: RequestEmailOtpForRecoveryInput!) {
    requestEmailOtpForRecovery(input: $input) {
      broadcastId
      sessionId
      expirationTime
    }
  }
`,y=`
  mutation requestSmsOtpForRecovery($input: RequestSmsOtpForRecoveryInput!) {
    requestSmsOtpForRecovery(input: $input) {
      broadcastId
      sessionId
      expirationTime
    }
  }
`,A=`
  mutation RequestEmailOtpForUpdateCredential {
    requestEmailOtpForUpdateCredential {
      broadcastId
      sessionId
      expirationTime
    }
  }
`,h=`mutation requestEmailOtpForRegistration(
  $input: RequestEmailOtpForRegistrationInput!
) {
  requestEmailOtpForRegistration(input: $input) {
    broadcastId
    sessionId
    expirationTime
  }
}`,O=`
  mutation requestSmsOtpForUpdateCredential($input: RequestSmsOtpForUpdateCredentialInput!) {
    requestSmsOtpForUpdateCredential(input: $input) {
      broadcastId
      sessionId
      expirationTime
    }
  }
`,R=`
  mutation requestUnauthenticatedOtp($input: RequestUnauthenticatedOtpInput!) {
    requestUnauthenticatedOtp(input: $input) {
      accepted
    }
  }
`,T=`
  mutation redeemUnauthenticatedOtp($input: RedeemUnauthenticatedOtpInput!) {
    redeemUnauthenticatedOtp(input: $input) {
      idToken
      expiresIn
    }
  }
`,N=`
  mutation requestAuthenticatedOtp($input: RequestAuthenticatedOtpInput!) {
    requestAuthenticatedOtp(input: $input) {
      accepted
    }
  }
`,C={[R]:`
  mutation requestUnauthenticatedOtp($input: RequestUnauthenticatedOtpInput!) {
    requestUnauthenticatedOtp(input: $input) {
      accepted
      challenge {
        signature
        details {
          challengeId
          requestContextHash
          expirationDate
          proofOfWork {
            algorithm
            difficulty
            challenge
          }
        }
      }
    }
  }
`,[N]:`
  mutation requestAuthenticatedOtp($input: RequestAuthenticatedOtpInput!) {
    requestAuthenticatedOtp(input: $input) {
      accepted
      challenge {
        signature
        details {
          challengeId
          requestContextHash
          expirationDate
          proofOfWork {
            algorithm
            difficulty
            challenge
          }
        }
      }
    }
  }
`},S=`
  mutation redeemAuthenticatedOtp($input: RedeemAuthenticatedOtpInput!) {
    redeemAuthenticatedOtp(input: $input) {
      tokens {
        access_token
        expires_in
        refresh_token
        refresh_expires_in
        id_token
        token_type
        issued_token_type
        scope
        profile {
          sub
          aud
          iss
          exp
          iat
          sid
        }
      }
    }
  }
`,D=`
  mutation updatePasswordBySwid($input: UpdatePasswordBySwidInput!) {
    updatePasswordBySwid(input: $input) {
      user {
        oneIDGuest {
          etag
        }
      }
      oneIDToken {
        access_token
        refresh_token
        swid
        ttl
        refresh_ttl
        scope
        sso
        id_token
        authenticator
        loginValue
        high_trust_expires_in
        initial_grant_in_chain_time
        client_id
        sessionTransferKey
      }
    }
  }
`,L=`
  mutation updatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      accepted
    }
  }
`,v=`
  mutation updateMarketingAssertions($input: UpdateMarketingAssertionsInput!) {
    updateMarketingAssertions(input: $input) {
      broadcastIds
    }
  }
`,P=`
  mutation updateMarketingAndLegal($input: UpdateMarketingAndLegalInput!) {
    updateMarketingAndLegal(input: $input) {
    accepted
    }
  }
`,U=`
mutation deleteUserBySwid($input: DeleteUserBySwidInput!) {
  deleteUserBySwid(input: $input) {
    accepted
  }
}`,b=`
  query getUserBySwid($input: GetUserBySwidInput!) {
  getUserBySwid(input: $input) {
    user {
      keys {
        identityId
        swid
      }
      account {
        id
        profiles {
          id
          name
          languagePreferences {
            subtitleAppearance {
              backgroundColor
              size
              description
              edgeStyle
              backgroundOpacity
              windowColor
              textColor
              fontOpacity
              font
              windowOpacity
            }
            subtitleLanguage
            preferSDH
            subtitlesEnabled
            playbackLanguage
            preferAudioDescription
            appLanguage
          }
        }
        defaultProfile
      }
      identity {
        id
        swid
        email
        username
        mobilePhoneNumber {
          internationalPrefix
          countryCode
          number
          verified
          created
          lastModified
          source
        }
        emailVerified
      }
      oneIDGuest {
        profile {
          swid
          referenceId
          testProfileFlag
          username
          prefix
          firstName
          middleName
          lastName
          suffix
          languagePreference
          region
          email
          parentEmail
          dateOfBirth
          gender
          ageBand
          ageBandAssumed
          countryCodeDetected
          emailVerified
          parentEmailVerified
          registrationDate
          dateLastModified
          linkedAccountsAvailable
          status
          addresses {
            addressGuid
            type
            line1
            line2
            line3
            city
            stateProvince
            postalCode
            country
            preferred
            dateCreated
            dateLastModified
          }
          phones {
            phoneGuid
            type
            number
            internationalPrefix
            extension
            preferred
            dateCreated
            dateLastModified
            countryCode
            verified
          }
          pronunciationName
        }
        linkedAccounts {
          swid
          isNRT
          isPrimaryDID
          username
          email
          parentEmail
          dateRegistered
          dateLastLogin
          registeredAffiliate
          loginDomains
          status
        }
        displayName {
          namespace
          displayName
          proposedDisplayName
          proposedStatus
          moderationStatusDate
        }
        geolocation {
          ip
          continentAlpha2
          countryAlpha2
          regionAlpha2
          latitude
          longitude
          usedFallback
        }
        marketing {
          code
          subscribed
          textID
        }
        entitlements {
          digitalAssetName
          digitalAssetSourceName
          productId
          assetId
          effectiveDate
          expirationDate
          policyType
        }
        activities {
          activities {
            activityCode
            activityList {
              dateRequested
              activityPermissionGuid
              approvalStatus
              swid
            }
          }
        }
        s2
        etag
        payload
      }
      assignments {
        featureId
        variantId
        version
        type
      }
    }
  }
}
`,w=`
  query getUnauthenticatedAssignments($input: GetAssignmentsInput!) {
    getUnauthenticatedAssignments(input: $input) {
      experimentAssignments {
        participantId {
          value
          type
        }
        experimentId
        featureId
        featureVersion
        variantId
        type
      }
      flagAssignments {
        flagValue {
          featureId
          flagValueId
          flagValueName
          payload
          hash
        }
      }
    }
  }
`,k=`
  query getAuthenticatedAssignments($input: GetAssignmentsInput!) {
    getAuthenticatedAssignments(input: $input) {
      experimentAssignments {
        participantId {
          value
          type
        }
        experimentId
        featureId
        featureVersion
        variantId
        type
      }
      flagAssignments {
        flagValue {
          featureId
          flagValueId
          flagValueName
          payload
          hash
        }
      }
    }
  }
`,q=`
  query getConsentForSwidAndSector($input: GetConsentForSwidAndSectorInput!) {
    getConsentForSwidAndSector(input: $input) {
      consent {
        swid
        sectorId
        scopes {
          scope
          accepted
          required
          order
          selectedByDefault
        }
        category
        createdAt
        updatedAt
      }
    }
  }
`,V=`
  mutation saveConsent($input: SaveConsentInput!) {
    saveConsent(input: $input) {
      ... on SaveConsentResult {
        consent {
          swid
          sectorId
          scopes {
            scope
            accepted
            required
            order
            selectedByDefault
          }
          category
          createdAt
          updatedAt
        }
      }
      ... on FailedResult {
        error {
          error
          errorType
          details {
            scopes {
              scope
              accepted
              required
              order
              selectedByDefault
            }
            requiredScopes
          }
          httpStatus
        }
      }
    }
  }
`,G=`
  mutation parentVerify($input: ParentVerifyInput!) {
    parentVerify(input: $input) {
      ... on ParentVerifyResult {
        grant
      }
      ... on FailedResult {
        error {
          error
          errorType
          httpStatus
        }
      }
    }
  }
`,$=`
  query getSiteConfig($input: GetSiteConfigInput!) {
    getSiteConfig(input: $input) {
      mobile {
        mobileCollectionEnabled
        supportedCountryCodes
        legal {
          ADULT {
            disclosures {
              requiresActiveConsent
              disclosureCode
              documents
              content {
                text
                links
              }
            }
          }
          TEEN {
            disclosures {
              requiresActiveConsent
              disclosureCode
              documents
              content {
                text
                links
              }
            }
          }
          CHILD {
            disclosures {
              requiresActiveConsent
              disclosureCode
              documents
              content {
                text
                links
              }
            }
          }
        }
      }
    }
  }
`,M=`
  mutation registerIdentityDevice($registerIdentityDeviceRequest: RegisterIdentityDeviceRequestInput!) {
    registerIdentityDevice(registerIdentityDeviceRequest: $registerIdentityDeviceRequest) {
      identityDevice {
        archived
        brand
        browserName
        browserVersion
        buildNumber
        category
        createdAt
        deviceId
        family
        formFactor
        friendlyDeviceName
        manufacturer
        modelName
        modelNumber
        modifiedAt
        operatingSystem
        operatingSystemVersion
        platform
        registeredClientId
        registeredUserAgent
        metadata {
          isTest
        }
        expiresAt
        fingerprintId
        profileIds
        userAgent
        applicationRuntime
        deviceProfile
      }
      grant {
        grantType
        assertion
      }
    }
  }
`,x=`
query checkAccessPolicy($input: CheckAccessPolicyInput!) {
  checkAccessPolicy(input: $input) {
    requirements {
      __typename
      ... on PasswordResetRequired {
        __typename
      }
      ... on EmailAddressRequired {
        __typename
      }
      ... on EmailVerificationRequired {
        __typename
      }
      ... on UserAttributeRequired {
        __typename
      }
      ... on LegalAssertionsRequired {
        __typename
      }
      ... on MarketingPreferencesRequired {
        __typename
      }
    }
    decision
  }
}
`,F=`
mutation redeemMagicLink($input: RedeemMagicLinkInput!) {
  redeemMagicLink(input: $input) {
    idToken
    expiresIn
  }
}
`,H=`
mutation CreateChildRegistrationInviteMutation($input: CreateChildRegistrationInviteInput!) {
  createChildRegistrationInvite(input: $input) {
    invitationId
  }
}
`,B=`
mutation CreateParentConsentInviteMutation($input: CreateParentConsentInviteInput!) {
  createParentConsentInvite(input: $input) {
    invitationId
  }
}
`,Y=`
  mutation deleteMobileNumber($input: DeleteMobileNumberInput!) {
    deleteMobileNumber(input: $input) {
      deleted
    }
  }
`,W=`
  mutation mobileCollectionOptOut($input: MobileCollectionOptOutInput!) {
    mobileCollectionOptOut(input: $input) {
      accepted
    }
  }
`,K=`
  mutation cancelDelete($input: CancelDeleteInput!) {
    cancelDelete(input: $input) {
      success
      requestId
      identityId
      previousState
      currentState
      cancelledAt
      message
    }
  }
`,j=`
  query getDeleteStatusByIdentityId($input: GetDeleteStatusByIdentityIdInput!) {
    getDeleteStatusByIdentityId(input: $input) {
      requestId
      currentState
      scheduledDate

    }
  }
`,J=`
  query OidcLookup($input: OidcByClientIdAndCountryCodeAndClassificationCodeInput!) {
    oidcByClientIdAndCountryCodeAndClassificationCode(input: $input) {
      oidcCountryScopes {
        ... on OidcCountryScope {
          clientId
          countryCode
          oidc {
            clientScopes {
              scope
              type
              prompt
              required
              selectedByDefault
              order
              isCountrySpecific
            }
          }
        }
      }
    }
  }
`},93052:function(e,t,n){n.d(t,{Qt:function(){return r},UF:function(){return i},yH:function(){return a}});let i="FAILURE_BY_DESIGN",r=["ACCOUNT_NOT_FOUND","ACTIONABLE_INPUT","ADVISORY","AUTHORIZATION_OTP_VERIFICATION_REQUIRED","ENTITLEMENT_ERROR","FAILURE_BY_DESIGN","FAILURE_CONTACT_CSR","GUEST_BLOCKED","INVALID_INPUT","LOGIN_OTP_VERIFICATION_REQUIRED","PPU_ACTIONABLE_INPUT","PPU_ERROR_CATEGORY","UNAUTHORIZED"];function a(e){return!!e&&Object.keys(e).some(t=>t.startsWith("GUEST_GATED_")&&Array.isArray(e[t])&&e[t].length>0)}},62957:function(e,t,n){n.d(t,{C$:function(){return r},FM:function(){return o},GD:function(){return s},LC:function(){return i},NO:function(){return a},QU:function(){return u},Xc:function(){return d},jq:function(){return c}});let i="op_sso_tokens",r="sso_token",a="sso_accounts",o="sso_storage_v2",s="show_l10n_keys",u="install_id",d="ː",c="galc"},98324:function(e,t,n){n.d(t,{A0:function(){return K},Az:function(){return F},Cn:function(){return G},Cw:function(){return d},GI:function(){return p},IQ:function(){return X},JM:function(){return I},JW:function(){return Q},KE:function(){return a},LO:function(){return v},MJ:function(){return O},NF:function(){return b},Ne:function(){return B},Pd:function(){return M},QS:function(){return Y},Qq:function(){return S},Qr:function(){return A},R7:function(){return T},Rr:function(){return N},SS:function(){return D},Sr:function(){return j},Su:function(){return z},TH:function(){return h},Uw:function(){return V},Xj:function(){return k},Ye:function(){return L},Yx:function(){return c},Z:function(){return E},_I:function(){return R},_W:function(){return m},am:function(){return J},dV:function(){return H},dn:function(){return $},do:function(){return x},e4:function(){return r},eD:function(){return l},fd:function(){return f},gJ:function(){return o},hD:function(){return q},hh:function(){return g},ki:function(){return U},on:function(){return w},rx:function(){return s},sJ:function(){return C},t3:function(){return y},tZ:function(){return W},ui:function(){return _},vp:function(){return u},yN:function(){return Z},zm:function(){return P}});var i=n(77011);let r="graph_errors",a="graph_response",o="graph_flow_response",s="graph_login_response",u="graph_registration_response",d="graph_otp_sessions",c="graph_token",p="op_interaction_token",l="op_oneid_token",f="sdk_flow",m="token",_="guest",g="loginValue",I="password",E="sdk_bridge_tester",y="bridgeParams",A="bridgeConfig",h="device_token",O="calledSetMobileConfig",R="mobileConfigDelivered",T="twdc_auth_options",N="is_biometrics_security_flag",C="user_device_code",S="verification_token",D="recovery_lookup_value",L="recovery_lookup_mobile_data",v="recovery_intent",P="update_credentials",U="verified_recovery",b=`${U}_${i.Ws}`,w=`${U}_${i.rJ}`,k="skip_optional_email_verification",q="conversation_id",V="conversation_id_fallback",G="ageband_dob",$="dob_nav_to",M="wpnx_experiments",x="wpnx_flags",F="wpnx_unauth_fetched",H="wpnx_header_targeting",B="wpnx_header_targeting_snapshot",Y="form_snapshot",W="prefilled_email",K="email_was_prefilled",j="parent_invite_sent_parent_email",J="login_page_visited",z="sign_in_identifier",X="flow_timing",Q="rum_flow_state",Z="ː"},3373:function(e,t,n){n.d(t,{$V:function(){return h},E2:function(){return f},H4:function(){return A},Hp:function(){return c},Qg:function(){return E},Uw:function(){return g},Vd:function(){return I},d7:function(){return p},dx:function(){return _},jA:function(){return l},yN:function(){return O}});var i=n(7633),r=n.n(i),a=n(77011),o=n(46155),s=n(3986),u=n(7695),d=n(68162);function c(){return!!window.identityUIToSDK}function p(){let e=window.self!==window.top,t=!!sessionStorage.getItem("bridgeParams");return(e||t)&&!c()}function l(){return c()||p()}function f(){return window?.identityUIToSDK?.getConfig&&window?.identitySDKToUI?.setMobileConfig?window.identityUIToSDK.getConfig('{ "callback": "setMobileConfig" }'):{}}function m(e){window.identitySDKToUI[e]&&delete window.identitySDKToUI[e]}function _(){let e=r()("biometricsCheckCallback"),t=new Promise(t=>{let n=setTimeout(()=>{m(e),t(null)},9e5);window.identitySDKToUI[e]=i=>{t(i),m(e),clearTimeout(n)}});return window.identityUIToSDK.biometricsCheck(JSON.stringify({callback:e})),t}function g(e){return"facial-recognition"===e?"faceid":"fingerprint"===e?"touchid":"android"}function I(e){let t=e||(0,u.NN)();if(!t)return!1;let{biometricsEnabled:n,biometricsOptOut:i,biometricsInitialized:r}=t;return n&&!i&&r}function E(e,t){let n=e?.toUpperCase();return"EMAIL"===n?{__typename:"DeliveryMethod",type:"EMAIL",maskedValue:t?.email?(0,d.of)(t.email):"",verified:!0}:"SMS"===n?{__typename:"DeliveryMethod",type:"SMS",maskedValue:t?.phone?(0,d.YY)(t.phone):""}:void 0}let y=[...Object.keys(o.x),...a.yV,"verification"];function A(e){return y.some(t=>t===e)}function h(e){return s.k.some(t=>t===e)}function O(e){if(!e)return{name:"AUTH_EMAIL_VERIFICATION_STEP_UP_AUTH"};switch(e){case"VERIFY_EMAIL":return{name:"AUTH_EMAIL_VERIFICATION_VERIFY_EMAIL"};case"STEP_UP_AUTH":return{name:"AUTH_EMAIL_VERIFICATION_STEP_UP_AUTH"};case"CHANGE_EMAIL":return{name:"AUTH_EMAIL_VERIFICATION_CHANGE_EMAIL"};case"CHANGE_PASSWORD":return{name:"AUTH_EMAIL_VERIFICATION_CHANGE_PASSWORD"};default:throw Error(`${e} is not a valid SDK reason`)}}},91357:function(e,t,n){n.d(t,{Ti:function(){return p},dT:function(){return o},i6:function(){return s},kL:function(){return u},vr:function(){return d},xG:function(){return l},xV:function(){return c}});var i=n(39366),r=n(7695);let a=()=>!0;function o(e,t){a()&&i.v.addError(Error(e),{conversation_id:(0,r.o_)(),...t})}function s(e,t){a()&&i.v.addAction(e,{conversation_id:(0,r.o_)(),...t})}function u(e,t,n,o){a()&&i.v.addDurationVital(e,{startTime:t,duration:n,context:{...o,conversation_id:(0,r.o_)()}})}function d(e,t){a()&&i.v.setGlobalContextProperty(e,t)}function c(e){a()&&Object.entries(e).forEach(([e,t])=>{void 0!==t&&i.v.setGlobalContextProperty(e,t)})}function p(...e){a()&&e.forEach(e=>i.v.removeGlobalContextProperty(e))}function l(){return a()&&i.v.getInternalContext()?.session_id||""}},53654:function(e,t,n){n.d(t,{Z:function(){return I}});var i=n(40257);let r="DTCI-DISNEYPLUS.WEB",a="/identity/login/passkey",o=Object.freeze({[r]:Object.freeze({passkey:`https://stage-web.disneyplus.com${a}`})}),s=Object.freeze({[r]:Object.freeze({passkey:`https://stage-web.disneyplus.com${a}`})}),u=Object.freeze({[r]:Object.freeze({passkey:`https://www.disneyplus.com${a}`})}),d=Object.freeze({baseURL:new URL("http://localhost:3000/"),DEFAULT_IDP:"dev",DEFAULT_OIDC_CLIENT:"ESPN-ESPN3PAUTHFLOW.WEB",GC_CLIENT:"STAGE",proxy:!0,homepage:!0,LOGGING_URL:"http://localhost:3000/v1/traces",ONEID_BASE:"https://stg.cdn.registerdisney.go.com",ORCHESTRATION_BASE:"https://login-qa.disney.com",OP_URL:"/api/op/",ORCHESTRATION_API_URL:"/api/graphql",ORCHESTRATION_ADAPTER_URL:"/api/oa/orchestration-adapter",DEVICE_GRAPH_URL:"https://qa-disney.api.edge.bamgrid.com/graph/v1/device/graphql",PREFETCH:!1,PROXY_OP_BASE:"https://login-qa.disney.com/",PROXY_MOCKED_REDIRECT:"https://login-qa.disney.com/bridge-cb",SDK_MESSAGE_TIMEOUT:6e4,PARENT_INVITE_BULLDOG_LANDING_URL:"https://qa.disneydigital.com/fortnite"}),c=Object.freeze({baseURL:new URL("http://localhost:3000/"),DEFAULT_IDP:"local",DEFAULT_OIDC_CLIENT:"ESPN-ESPN3PAUTHFLOW.WEB",GC_CLIENT:"STAGE",proxy:!0,homepage:!0,LOGGING_URL:null,ONEID_BASE:"https://stg.cdn.registerdisney.go.com",ORCHESTRATION_BASE:"https://login-qa.disney.com",OP_URL:"/api/op/",ORCHESTRATION_API_URL:"/api/graphql",ORCHESTRATION_ADAPTER_URL:"/api/oa/orchestration-adapter",DEVICE_GRAPH_URL:"https://qa-disney.api.edge.bamgrid.com/graph/v1/device/graphql",PREFETCH:!1,PROXY_OP_BASE:"https://login-qa.disney.com/",PROXY_MOCKED_REDIRECT:"https://login-qa.disney.com/bridge-cb",RELAY_TARGETS:o,SDK_MESSAGE_TIMEOUT:6e4,PARENT_INVITE_BULLDOG_LANDING_URL:"https://qa.disneydigital.com/fortnite"}),p=Object.freeze({baseURL:new URL("http://localhost:3000/"),DEFAULT_IDP:"local",DEFAULT_OIDC_CLIENT:"ESPN-ESPN3PAUTHFLOW.WEB",GC_CLIENT:"PROD",proxy:!0,homepage:!0,LOGGING_URL:null,ONEID_BASE:"https://cdn.registerdisney.go.com",ORCHESTRATION_BASE:"https://login.disney.com",OP_URL:"/api/op/",ORCHESTRATION_API_URL:"/api/graphql",ORCHESTRATION_ADAPTER_URL:"/orchestration-adapter",DEVICE_GRAPH_URL:"https://disney.api.edge.bamgrid.com/graph/v1/device/graphql",PREFETCH:!1,PROXY_OP_BASE:"https://login.disney.com/",PROXY_MOCKED_REDIRECT:"https://login.disney.com/bridge-cb",RELAY_TARGETS:u,SDK_MESSAGE_TIMEOUT:6e4,PARENT_INVITE_BULLDOG_LANDING_URL:"https://www.disneydigital.com/fortnite"}),l=Object.freeze({...c,baseURL:new URL("https://localhost:3000/")}),f=Object.freeze({...c,baseURL:new URL("https://login-dev.disneyaccount.com/"),DEFAULT_IDP:"dev",LOGGING_URL:"https://feet-qa.segds.engsvc.go.com/log"}),m=Object.freeze({...f,baseURL:new URL("https://identityui-ephemeral.us-west-2.twdcgrid.net/"),DEFAULT_IDP:"ephemeral"}),_=Object.freeze({baseURL:new URL("https://login-qa.disney.com/"),DEFAULT_IDP:"qa",DEFAULT_OIDC_CLIENT:"ESPN-ESPN3PAUTHFLOW.WEB",GC_CLIENT:"STAGE",proxy:!1,homepage:!0,LOGGING_URL:"https://feet-stg.segds.engsvc.go.com/log",ONEID_BASE:"https://stg.cdn.registerdisney.go.com",ORCHESTRATION_BASE:"https://login-qa.disney.com",OP_URL:"/",ORCHESTRATION_API_URL:"/api/graphql",ORCHESTRATION_ADAPTER_URL:"/orchestration-adapter",DEVICE_GRAPH_URL:"https://qa-disney.api.edge.bamgrid.com/graph/v1/device/graphql",PREFETCH:!0,PROXY_OP_BASE:"https://login-qa.disney.com/",PROXY_MOCKED_REDIRECT:"https://login-qa.disney.com/bridge-cb",RELAY_TARGETS:o,SDK_MESSAGE_TIMEOUT:6e4,PARENT_INVITE_BULLDOG_LANDING_URL:"https://qa.disneydigital.com/fortnite"}),g=Object.freeze({localQA:c,localPROD:p,localQASecure:l,test:d,dev:f,qa:_,ephemeral:m,stg:_,preprod:Object.freeze({baseURL:new URL("https://preprod-login-disney.api.edge.bamgrid.com/"),DEFAULT_IDP:"preprod",DEFAULT_OIDC_CLIENT:"ESPN-ESPN3PAUTHFLOW.WEB",GC_CLIENT:"PROD",proxy:!0,homepage:!0,LOGGING_URL:"https://feet-stg.segds.engsvc.go.com/log",ONEID_BASE:"https://stg.cdn.registerdisney.go.com",ORCHESTRATION_BASE:"https://login.disney.com",OP_URL:"/api/op/",ORCHESTRATION_API_URL:"/api/graphql",ORCHESTRATION_ADAPTER_URL:"/orchestration-adapter",DEVICE_GRAPH_URL:"https://disney.api.edge.bamgrid.com/graph/v1/device/graphql",PREFETCH:!0,PROXY_OP_BASE:"https://login.disney.com/",PROXY_MOCKED_REDIRECT:"https://login.disney.com/bridge-cb",RELAY_TARGETS:s,SDK_MESSAGE_TIMEOUT:3e3,PARENT_INVITE_BULLDOG_LANDING_URL:"https://www.disneydigital.com/fortnite"}),prod:Object.freeze({PREFETCH:!0,GC_CLIENT:"PROD",DEFAULT_IDP:"prod",DEFAULT_OIDC_CLIENT:"ESPN-ESPN3PAUTHFLOW.WEB",ORCHESTRATION_API_URL:"/api/graphql",ORCHESTRATION_ADAPTER_URL:"/orchestration-adapter",DEVICE_GRAPH_URL:"https://disney.api.edge.bamgrid.com/graph/v1/device/graphql",OP_URL:"/",ONEID_BASE:"https://cdn.registerdisney.go.com",ORCHESTRATION_BASE:"https://login.disney.com",LOGGING_URL:"https://log.go.com/log",proxy:!1,homepage:"https://my.disney.com/",baseURL:new URL("https://login.disney.com/"),PROXY_OP_BASE:"https://login.disney.com/",PROXY_MOCKED_REDIRECT:"https://login.disney.com/bridge-cb",RELAY_TARGETS:u,SDK_MESSAGE_TIMEOUT:3e3,PARENT_INVITE_BULLDOG_LANDING_URL:"https://www.disneydigital.com/fortnite"})});function I(){return g[window.APP_ENV||i?.env?.APP_ENV||"qa"]||g.qa}},94118:function(e,t,n){n.d(t,{V:function(){return i}});function i(){try{return window.localStorage}catch{return window.sessionStorage}}},27691:function(e,t,n){n.d(t,{$Y:function(){return s},DN:function(){return r},EB:function(){return u},Mc:function(){return d},Yb:function(){return o},dh:function(){return a}});var i=n(93052);let r=40,a="error_codes",o="error_category",s="http_status",u="reclaim";function d(e){return e&&i.Qt.includes(e)?r:50}},69052:function(e,t,n){n.d(t,{Nk:function(){return a},Tb:function(){return s},VE:function(){return o},rv:function(){return r}});var i=n(42200);function r(e,t="US",n=1){return{countryCode:t,internationalPrefix:n,number:e.replace(/[^\d]/g,"")}}function a(e){let t=e.startsWith("00")?`+${e.slice(2)}`:e;try{let e=(0,i.h)(t);if(e?.country)return{countryCode:e.country,internationalPrefix:Number(e.countryCallingCode),number:e.nationalNumber}}catch{}return{countryCode:"US",internationalPrefix:1,number:e.replace(/[^\d]/g,"")}}function o(e){return e.startsWith("+")||e.startsWith("00")}function s(e,t){return o(e)?a(e):{number:e,internationalPrefix:t?.internationalPrefix??1,countryCode:t?.countryCode??"US"}}},7695:function(e,t,n){n.d(t,{CE:function(){return g},En:function(){return u},HG:function(){return m},IX:function(){return l},Ju:function(){return _},L4:function(){return I},NN:function(){return p},QK:function(){return E},V6:function(){return c},Z8:function(){return A},_K:function(){return f},aB:function(){return h},br:function(){return R},gc:function(){return O},mw:function(){return d},o_:function(){return y}});var i=n(70764),r=n.n(i),a=n(2444),o=n(69052),s=n(98324);function u(e){let t=sessionStorage.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch(t){return a.ZP.errorEvent({eventPayload:"INVALID_JSON",additionalInfo:{key:e},error_codes:"INVALID_JSON",error_category:"UNKNOWN_ERROR",stackTrace:t instanceof Error?t.stack:""}),null}}function d(e,t){try{let n=JSON.stringify(t);sessionStorage.setItem(e,n)}catch(t){a.ZP.errorEvent({eventPayload:"SET_JSON_ITEM_FAILED",additionalInfo:{key:e,error:t instanceof Error?t.message:"Unknown"},error_codes:"STORAGE_ERROR",error_category:"UNKNOWN_ERROR",stackTrace:t instanceof Error?t.stack:""})}}function c(){return u(s.t3)}function p(){return u(s.Qr)}function l(e){d(s.Qr,e)}function f(){return u(s.R7)}function m(){return u(s.KE)||{data:null,errors:null}}function _(){return u(s.TH)}function g(e){sessionStorage.setItem(s.TH,JSON.stringify(e))}function I(){return!!sessionStorage.getItem(s.TH)}function E(e){sessionStorage.setItem(s.hD,e)}function y(){return sessionStorage.getItem(s.hD)||sessionStorage.getItem(s.Uw)||""}function A(e){try{return JSON.parse(e.getItem(s.gJ)||"{}")||{}}catch(e){return a.ZP.errorEvent({eventPayload:"INVALID_FLOW_DATA_JSON",additionalInfo:{error:e instanceof Error?e.message:"Unknown"},error_codes:"INVALID_JSON",error_category:"UNKNOWN_ERROR",stackTrace:e instanceof Error?e.stack:""}),{}}}function h(){let e=p()||c()||f()||{};if(r()(e))return null;let{platform:t="web",sdkInstallId:n="",sdkVersion:i="",sdkSwid:a="",conversationId:o,identityOptions:s}=e;return{conversationId:o||y(),platform:t,sdkInstallId:n,sdkVersion:i,sdkSwid:a,identityOptions:s}}function O(){let e=JSON.parse(sessionStorage.getItem(s.KE)||"{}");e&&e.errors&&sessionStorage.setItem(s.e4,JSON.stringify(e))}function R(){let e=sessionStorage.getItem(s.SS)??"",t=JSON.parse(sessionStorage.getItem(s.Ye)??"{}");return(0,o.VE)(e)?e:t?.internationalPrefix?`+${t.internationalPrefix}${e}`:e}},68162:function(e,t,n){function i(e){let[t,n]=e.split("@"),i=t.length>4?t.substring(0,3):t[0];return`${i}****@${n}`}function r(e){if(!e)return"";let t=e.slice(-4);return`******${t}`}n.d(t,{YY:function(){return r},of:function(){return i}})}}]);