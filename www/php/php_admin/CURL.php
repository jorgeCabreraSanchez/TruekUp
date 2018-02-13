<?php
class CURL
{
    public $url;
    public $method;
    public $fields;

    public function __construct($url,$method){
        $this->url = $url; 
        $this->method = $method;
    }

    public function setFields($fields){
        $this->fields=$fields;
    }

    public function ejecutar()
    {
        $curl = curl_init($this->url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $this->method);
        if(isset($this->fields)){
            curl_setopt($curl, CURLOPT_POSTFIELDS, $this->fields);
        }
        $curl_response = curl_exec($curl);
        $code = curl_getinfo($curl,CURLINFO_RESPONSE_CODE);

        if ($curl_response === false) {
            $info = curl_getinfo($curl);
            curl_close($curl);
            die('error occured during curl exec. Additioanl info: ' . var_export($info));
        }

        curl_close($curl);

        $devolver = [];
        $devolver[] = json_decode($curl_response,true);
        $devolver[] = $code;

        return $devolver;

    }
}
?>