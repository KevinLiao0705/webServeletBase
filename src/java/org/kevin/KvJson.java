/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.kevin;

import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author User
 */
public class KvJson {

    public String messageStr = "Error";
    public String valueStr = "";
    public JSONObject valueJo;
    public boolean errorF = true;
    public JSONObject jobj;
    public JSONArray jary;
    public ArrayList<String> strAL = new ArrayList<String>();

    public KvJson() {

    }

    public boolean rStrA(JSONObject iobj, String key) {
        jobj = iobj;
        return rStrA(key);
    }

    public boolean rStrA(String key) {
        errorF = true;
        try {
            this.valueStr = jobj.get(key).toString();
            jary = new JSONArray(jobj.get(key).toString());
            strAL.clear();
            for (int i = 0; i < jary.length(); i++) {
                strAL.add(jary.get(i).toString());
            }
        } catch (JSONException ex) {
            messageStr = "Read Json(key:" + key + ") To String Array Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }

    public boolean rStr(JSONObject iobj, String key) {
        jobj = iobj;
        return rStr(key);
    }

    public boolean rStr(String key) {
        errorF = true;
        try {
            this.valueStr = jobj.get(key).toString();
        } catch (JSONException ex) {
            messageStr = "Read Json(key:" + key + ") To String Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }


    public boolean rJo(JSONObject iobj, String key) {
        jobj = iobj;
        return rJo(key);
    }
    
    public boolean rJo(String key) {
        errorF = true;
        try {
            this.valueJo = new JSONObject(jobj.get(key).toString());
        } catch (JSONException ex) {
            messageStr = "Read Json(key:" + key + ") To String Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }
    
    

    public boolean wObj(JSONObject jo, String key, Object value) {
        errorF = true;
        try {
            jo.put(key, value);
        } catch (JSONException ex) {
            messageStr = "Write Json(key:" + key + ") Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }

    public boolean wStr(JSONObject jo, String key, String value) {
        errorF = true;
        try {
            jo.put(key, value);
        } catch (JSONException ex) {
            messageStr = "Write Json(key:" + key + ") Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }
    
    
}
