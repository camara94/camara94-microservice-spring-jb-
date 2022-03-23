package com.stardevcgroup.iset.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileResponse {
    private String name;
    private String uri;
    private String type;
    private long size;
}
